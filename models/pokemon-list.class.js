import { Pokemon } from "./pokemon.class.js";

export class PokemonList {

    contentDom;
    pokemonService;
    pokemonList = [];
    limit = 20;
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
        newPokemons.forEach((pokemon) => {
            let newPokemon = new Pokemon(pokemon, this.pokemonService);
            this.pokemonList.push(newPokemon);
            this.renderPokemon(newPokemon);
        });
    }

    renderAllPokemon() {
        this.contentDom.innerHTML = '';
        this.pokemonList.forEach((pokemon) => {
            this.contentDom.innerHTML += this.generatePokemonHTML(pokemon);
        });
    }

    renderPokemon(pokemon) {
        this.contentDom.innerHTML += this.generatePokemonHTML(pokemon);
    }

    generatePokemonHTML(pokemon) {
        return /*html*/ `
            <div class="pokemonCard">
                <div>
                    <h2>${pokemon.name}</h2>
                </div>
            </div>
        `;
    }
}