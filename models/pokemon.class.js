export class Pokemon {
    
    pokemonService;
    
    id;
    name;
    url;
    abilities;
    sprite;
    types = [];
    weight;

    constructor(id, obj, pokemonService) {
        this.id = id;
        this.name = obj.name;
        this.url = obj.url;
        this.pokemonService = pokemonService;
        this.loadPokemonData();
        console.log(this);
    }

    async loadPokemonData() {
        const pokemonData = await this.pokemonService.getPokemon(this.url);
        this.setTypes(pokemonData.types);
    }

    setTypes(data) {
        data.forEach((typeData) => {
            this.types.push(typeData.type.name);
        });
    }

}