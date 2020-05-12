const { gql } = require('apollo-server');

const typeDefs = gql`

  type Game {
    title: String
    year: String
  }

  type Query {
    games: [Game]
  }
`;

module.exports = typeDefs;