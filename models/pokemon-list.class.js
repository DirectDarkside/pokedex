import { Pokemon } from "./pokemon.class.js";

export class PokemonList {

    contentDom;
    pokemonService;
    pokemonList = [];
    limit = 1;
    offset = 0;

    constructor(id, pokemonService) {
        this.contentDom = document.getElementById(id);
        this.pokemonService = pokemonService;
        this.incrementPokemonList();
        console.log(this);
    }

    async incrementPokemonList() {
        let newPokemons = await this.pokemonService.getPokemonList(this.limit, this.offset);
        this.offset += this.limit;
        newPokemons.forEach((pokemon, index) => {
            let newPokemon = new Pokemon(index, pokemon, this.pokemonService);
            this.pokemonList.push({
                id: index,
                pokemon: newPokemon
            });
            this.renderPokemon(index, newPokemon);
        });
    }

    renderAllPokemon() {
        this.contentDom.innerHTML = '';
        this.pokemonList.forEach((pokemon) => {
            this.contentDom.innerHTML += this.generatePokemonHTML(pokemon);
        });
    }

    renderPokemon(id, pokemon) {
        this.contentDom.innerHTML += this.generatePokemonHTML(id, pokemon);
    }

    generatePokemonHTML(id, pokemon) {
        return /*html*/ `
            <div class="pokemonCard" id="pokemonCard${id}">
                <div>
                    <h2>${pokemon.name}</h2>
                </div>
                <div id="pokemonTypes${id}">
                </div>

            </div>
        `;
    }
}