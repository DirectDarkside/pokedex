export class PokemonService {


    async getPokemon(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const responseAsJson = await response.json();
        return responseAsJson;
    }

    async getPokemonList(limit, offset) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const responseAsJson = await response.json();
        console.log(responseAsJson);
        return responseAsJson.results;
    }
}