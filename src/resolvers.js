module.exports = {
  Query: {
    games: async (_, __, { dataSources }) => {
      const allGames = await dataSources.gameAPI.getGames();
      return allGames;
    },
  },
};
