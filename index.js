const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  type Game {
    title: String
    year: String
  }

  type Query {
    games: [Game]
  }
`;

const games = [
  {
    title: 'The Witcher 3: Wild Hunt',
    year: '2015',
  },
  {
    title: 'Grim Fandango Remastered',
    year: '2015',
  },
  {
    title: 'Everybody’s Gone to the Rapture',
    year: '2015',
  },
  {
    title: 'Uncharted 4: A Thief’s End',
    year: '2016',
  },
  {
    title: 'Firewatch',
    year: '2016',
  },
  {
    title: 'Ratchet & Clank (2016)',
    year: '2016',
  },
  {
    title: 'Unravel',
    year: '2016',
  },
  {
    title: 'Horizon Zero Dawn',
    year: '2017',
  },
  {
    title: 'What Remains of Edith Finch',
    year: '2017',
  }
];

const resolvers = {
  Query: {
    games: () => games,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});