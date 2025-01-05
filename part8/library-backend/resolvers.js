
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { UserInputError } = require('apollo-server')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      if (args.author && args.genre) {
        return books.filter(book => book.author.name === args.author && book.genres.includes(args.genre))
      } else if (args.author) {
        return books.filter(book => book.author.name === args.author)
      } else if (args.genre) {
          return books.filter(book => book.genres.includes(args.genre))
      } else {
        return books
      }
    },
    allAuthors: async () => {
      // const authors = await Author.find({})
      // console.log(authors)
      console.log('Author.find')
      const authors = await Author.find({}).populate('books')
      const newAuthors = authors.map(author => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.books.length
        }
      })
      return newAuthors
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  // Author: {
  //   // bookCount: root => books.filter(book => book.author === root.name).length
  //   bookCount: async (root) => {
  //     // console.log("root: ", root)
  //     console.log("bookCount.find")
  //     return Book.find({author: root._id}).countDocuments()
  //   }
  // },
  Mutation: {
    addBook: async (root, args, context) => {
      // console.log("args: ", args)

      // const authors = await Author.find({})
      const findAuthor = await Author.findOne({name: args.author})
      console.log("findAuthor: ", findAuthor)

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }    
        })
      }
      if (!findAuthor) { // if author not found
        try {
          // create a new author
          const newAuthor = new Author({ name: args.author, books: []})
          await newAuthor.save()
          // create a new book
          console.log("newAuthor: ", newAuthor)
          const book = await new Book({ ...args, author: newAuthor._id}).populate('author')
          console.log("book: ", book)
          // update the author's books
          newAuthor.books = newAuthor.books.concat(book._id)
          await newAuthor.save()
          await book.save()

          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          return book
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        try {
          const book = await new Book({ ...args, author: findAuthor._id}).populate('author')
          await book.save()

          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          return book
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({name: args.name})
      if (!author) {
        return null
      }
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        author.born = args.setBornTo
        await author.save()
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre})

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      // console.log("userForToken: ", userForToken)

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers