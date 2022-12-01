const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

const MONGODB_URI =
  "mongodb+srv://fullstackNotes:Rufaidat@cluster0.xsbzetz.mongodb.net/graphqlLibrary?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: String!
    born: Int
    books: [String!]!
    bookCount: Int!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors(name: String, id: Int): [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const result = await Book.find({});
      if (!args) return result;
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const id = author["_id"];
        result = await Book.find({ author: { $in: [id] } }).populate("author");
      }
      if (args.genre) {
        const genreArg = args.genre;
        result = await Book.find({
          genres: { $in: [genreArg] },
        }).populate("author");
      }
      return result;
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({}).populate("author");
      authors.map((author) => {
        author.bookCount = books.filter(
          (book) => book.author === author.name
        ).length;
        return author;
      });
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let book = new Book({ ...args });

      const authorExists = await Author.find({ name: args.author });
      if (!authorExists) {
        try {
          await new Author({ name: args.author }).save();
        } catch (error) {
          throw new UserInputError(error.message);
        }
      }
      const authorToSave = await Author.findOne({ name: args.author });

      book = new Book({ ...args, author: authorToSave });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }
      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.find({ name: args.name });
      author.born = args.setBornTo;
      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
