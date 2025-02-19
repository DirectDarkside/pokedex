export class Pokemon {
    
    pokemonService;
    
    name;
    url;
    abilities;
    sprite;
    types;
    weight;

    constructor(obj, pokemonService) {
        this.name = obj.name;
        this.url = obj.url;
        this.pokemonService = pokemonService;
    }

}