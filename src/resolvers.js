module.exports = {
  Query: {
    games: (_, __, { dataSources }) => {
      dataSources.gameAPI.getAllGames();
    },
  },
};
