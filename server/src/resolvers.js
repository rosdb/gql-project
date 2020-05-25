module.exports = {
  Query: {
    games: async (_, __, { dataSources }) => {
      const pages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      const allGames = await Promise.all(pages.map(page => dataSources.gameAPI.getGames(page)));
      return allGames.flat();
    },
    gameDetails: async (_, { id }, { dataSources }) => {
      const gameDetails = await dataSources.gameAPI.getDetails(id)
      return gameDetails;
    }
  },
};
