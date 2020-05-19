const { RESTDataSource } = require('apollo-datasource-rest');


class GameAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.rawg.io/api/';
	}

	gameReducer(game) {
		return {
			title: game.name,
			year: game.released.slice(0,4)
		};
	}
	
	async getGames(page) {
		const response = await this.get(`games?page=${page}`);
		return response.results.map(game => this.gameReducer(game));
	}
}

module.exports = GameAPI;