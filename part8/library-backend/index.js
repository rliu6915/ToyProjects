const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
// const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()

const MONGOOB_URI = process.env.MONGOOB_URI
console.log('connecting to', MONGOOB_URI)

mongoose.connect(MONGOOB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })


const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

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
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    // bookCount: root => books.filter(book => book.author === root.name).length
    bookCount: async (root) => Book.find({author: root.name}).countDocuments()
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log("args: ", args)

      // const authors = await Author.find({})
      const findAuthor = await Author.findOne({name: args.author})
      console.log("findAuthor: ", findAuthor)
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
          return book
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({name: args.name})
        if (!author) {
          return null
        }

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

      return await user.save()
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
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})