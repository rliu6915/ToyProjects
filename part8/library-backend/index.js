const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid');

const Author = require('./models/author')
const Book = require('./models/book')

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})