export class PokemonService {


    async getPokemon(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const responseAsJson = await response.json();
        return responseAsJson;
    }
}