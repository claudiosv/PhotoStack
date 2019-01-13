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
    getPhotosByUser: [Photo]
    getUserById(id: ID!): User
    getUserByEmail(email: String!): User
    loginUser(email: String!, password: String!): String
    searchPhotos(query: String!): [Photo]
    getAutocomplete(query: String!): [String]
    getHighlights: [Photo]
    getHeaps: [Heap]
    getHeap(heapID: ID!): Heap
    getPhoto(photoID: ID!): Photo
  }

  type File {
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
      id: ID!
      email: String
      password: String
      firstName: String
      lastName: String
    ): String
    createHeap(name: String!, tags: [String]!): String
    uploadPhoto(file: Upload!): File!
    uploadPhotos(file: Upload!): File!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = schema;
