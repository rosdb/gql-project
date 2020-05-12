const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require('./resolvers');
const GameAPI = require("./datasources/games");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    gameAPI: new GameAPI()
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
