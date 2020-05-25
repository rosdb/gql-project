const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    games: [Game]
    gameDetails(id: ID!): Details
  }

  type Game {
    id: ID
    title: String
    details: Details
  }

  type Details {
    title: String
    description: String
    rating: Float
    website: String
    image: String
  }
`;

module.exports = typeDefs;
