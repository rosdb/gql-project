const { RESTDataSource } = require("apollo-datasource-rest");

class GameAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.rawg.io/api/";
  }

  gameReducer(game) {
    return {
      id: game.id,
			title: game.name,
			details: this.getDetails(game.id)
    };
  }

  detailsReducer(game) {
    return {
      title: game.name,
      description: game.description,
      rating: game.rating,
			website: game.website,
			image: game.background_image
    };
  }

  async getGames(page) {
    const response = await this.get(`games?page=${page}`);
    return response.results.map((game) => this.gameReducer(game));
	}
	
	async getDetails(id) {
		const response = await this.get(`games/${id}`);
		return this.detailsReducer(response);
	}
}

module.exports = GameAPI;
