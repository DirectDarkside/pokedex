import { PokemonList } from "./models/pokemon-list.class.js";
import { PokemonService } from "./services/pokemon.service.js";


const pokemonList = new PokemonList('pokemonList', new PokemonService());

