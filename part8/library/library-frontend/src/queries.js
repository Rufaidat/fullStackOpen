import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

export const NEW_BOOK = gql`
  mutation newBook(
    $title: String!
    $author: String!
    $published: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      genres: $genres
      published: $published
    ) {
      title
      author
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: String!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;