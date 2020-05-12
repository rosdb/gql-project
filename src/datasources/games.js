const { RESTDataSource } = require('apollo-datasource-rest');


class GameAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.rawg.io/api/games';
	}

	gameReducer(game) {
		return {
			title: game.name,
			year: game.released
		};
	}
	
	async getAllGames() {
		const response = await this.get('games');
		console.log(response);
		return Array.isArray(response)
			? response.map(game => this.gameReducer(game))
			: [];
	}
}

module.exports = GameAPI;