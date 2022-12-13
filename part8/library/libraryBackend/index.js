const { ApolloServer, gql, UserInputError } = require("apollo-server");
require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/user");
const Author = require("./models/author");
const Book = require("./models/book");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

const MONGODB_URI = process.env.MONGODB_URI;

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
    id: ID!
    born: Int
    bookCount: Int!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors(name: String, id: Int): [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = await Book.find({});
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
      let authors = await Author.find({});
      const books = await Book.find({}).populate("author");
      return authors.map((author) => {
        author.bookCount = books.filter(
          (book) => book.author["name"] === author["name"]
        ).length;
        return author;
      });
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("Authentication Required");
      }
      const existingBook = await Book.findOne({ title: args.title });

      if (existingBook) {
        throw new UserInputError("Book Already exists");
      }

      if (args.title.length < 4) {
        throw new UserInputError("title is too short, minimum length is 2", {
          invalidArgs: args.title,
        });
      }

      if (args.author.length < 4) {
        throw new UserInputError("author is too short,  minimum length is 4", {
          invalidArgs: args.author,
        });
      }
      const authorExists = await Author.findOne({ name: args.author });
      if (!authorExists) {
        try {
          const author = new Author({ name: args.author });
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message);
        }
      }
      const authorToSave = await Author.findOne({ name: args.author });

      const book = new Book({ ...args, author: authorToSave });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("Authentication Required");
      }
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
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
