const { gql } = require('apollo-server');

const typeDefs = gql`

  type Game {
    id: ID,
    title: String,
    details: Details
  }

  type Details {
    title: String,
    description: String,
    rating: Float,
    website: String,
    image: String
  }

  type Query {
    games: [Game],
    gameById(id: Int): Details
  }
`;

module.exports = typeDefs;