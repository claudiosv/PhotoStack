const { ApolloServer, gql } = require("apollo-server");
const schema = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
  }

  type Heap {
    id: ID!
    owner: ID!
    name: String!
    tags: [String]!
  }

  type Metadata {
    shootTime: Float!
    location: [Float]!
  }

  type Photo {
    id: ID!
    owner: ID!
    metadata: Metadata
    fileName: String!
    uploadTime: Float!
    tags: [String]
    objectId: String!
    derivatives: [String]
    postProcessing: [String]
    height: Int!
    width: Int!
    mimeType: String!
    thumbnail: String!
    fullsize: String!
  }

  type Query {
    getPhotos: [Photo]
    getUser: User
    loginUser(email: String!, password: String!): User
    searchPhotos(query: String!): [Photo]
    getAutocomplete(query: String!): [String]
    getHighlights: [Photo]
    getHeaps: [Heap]
    getHeap(id: ID!): Heap
    getPhoto(id: ID!): Photo
    isLoggedIn: String
  }

  type File {
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): User
    updateUser(
      email: String
      password: String
      firstName: String
      lastName: String
    ): User
    createHeap(name: String!, tags: [String]!): Heap
    logout: String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = schema;
