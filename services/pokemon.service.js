export class PokemonService {


    async getPokemon(url) {
        const response = await fetch(url);
        const responseAsJson = await response.json();
        return responseAsJson;
    }

    async getPokemonList(limit, offset) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const responseAsJson = await response.json();
        return responseAsJson.results;
    }
}