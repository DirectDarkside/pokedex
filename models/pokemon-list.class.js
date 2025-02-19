export class PokemonList {

    contentDom;
    pokemonList = [];

    constructor(id) {
        this.contentDom = document.getElementById(id);
    }

    renderPokemon() {

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