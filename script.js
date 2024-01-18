let previousUrl;
let pokemonList;
let nextUrl;
let pokemons = [];

function init() {
    loadPokemonList();
}

async function getFetch(link) {
    let response = await fetch(link);
    responseAsJson = await response.json()
    return responseAsJson;
}

async function loadPokemonList() {
    let responseAsJson = await getFetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    console.log(responseAsJson);
    pokemonList = responseAsJson.results;
    renderPokemonList(pokemonList);
    setButtonAttribute(responseAsJson);
}

async function loadNewPokemonList(event) {
    let link; 
    if(event == 'previous') {
        link = previousUrl
    } else link = nextUrl;
    let url = link;
    let responseAsJson = await getFetch(url)
    pokemonList = responseAsJson.results;
    renderPokemonList(pokemonList);
    setButtonAttribute(responseAsJson);
}

function renderPokemonList(pokemonList) {
    let pokemonListContent = document.getElementById('pokemonList');
    pokemonListContent.innerHTML = '';
    pokemonList.forEach((pokemon, index) => {
        let pokemonName = capitalizeFirstLetter(pokemon.name);
        pokemonListContent.innerHTML += generatePokemonList(pokemon, index, pokemonName);
        loadPokemon(pokemon, index);
    });
}

function setButtonAttribute(pokemonList) {
    let previousButton = document.getElementById('previousButton');
    let nextButton = document.getElementById('nextButton');
    if(pokemonList.previous) {
        previousButton.disabled = false;
        previousUrl = pokemonList.previous;
    } else {
        previousButton.disabled = true;
        previousUrl = null;
    }
    if(pokemonList.next) {
        nextButton.disabled = false;
        nextUrl = pokemonList.next;
    } else {
        nextButton.disabled = true;
        nextUrl = null;
    }
}

async function loadPokemon(pokemon, index) {
    let url = pokemon.url;
    currentPokemon = await getFetch(url);
    renderPokemonType(currentPokemon, index);
    renderPokemonImage(currentPokemon, index);
}

function renderPokemonImage(pokemon, index) {
    document.getElementById(`pokemonImage${index}`).src = pokemon.sprites['front_default'];
}

async function renderPokemonInfo(index) {
    let pokemon = pokemonList[index];
    let currentPokemon = await getFetch(pokemon.url);
    let content = document.getElementById('pokedex');
    let pokemonName = capitalizeFirstLetter(currentPokemon.name);
    content.innerHTML = generatePokemonInfo(currentPokemon, pokemonName);
    renderPokemonCardType(currentPokemon);
    renderPokemonCardAbilities(currentPokemon);
    document.getElementById('cardTop').style.backgroundColor = document.getElementById(`pokemonCard${index}`).style.backgroundColor;
}

function renderPokemonType(pokemon, index) {
    let typeContent = document.getElementById(`pokemonTypes${index}`);
    let pokemonTypeArr = pokemon.types;
    typeContent.innerHTML = '';
    for(let i = 0; i < pokemonTypeArr.length; i++) {
        typeContent.innerHTML += generatePokemonType(pokemonTypeArr[i].type.name);
        checkBackgroundColor(pokemonTypeArr[i].type.name, index, i);
    }
}

function checkBackgroundColor(type, index, j) {
    if(j == 0 && type != 'normal') {
        typesList.forEach(typeElement => {
            if(type == typeElement.name) {
                document.getElementById(`pokemonCard${index}`).style.backgroundColor = typeElement.color;
            }
        })
    } 
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderPokemonCardType(pokemon) {
    let typeContent = document.getElementById('pokemonTypes');
    typeContent.innerHTML = '';
    for(let i = 0; i < pokemon.types.length; i++) {
        typeContent.innerHTML += generatePokemonType(pokemon.types[i].type.name);
    }
}

function renderPokemonCardAbilities(pokemon) {
    let typeContent = document.getElementById('abilities');
    typeContent.innerHTML = '';
    for(let i = 0; i < pokemon.abilities.length; i++) {
        typeContent.innerHTML += generatePokemonAbilities(pokemon.abilities[i].ability.name);
    }
}

function loadPokemonCard(index) {
    openCard();
    renderPokemonContainer(index);
    renderPokemonInfo(index);
}

function renderPokemonContainer(index) {
    let content = document.getElementById('pokedexContainer');
    content.innerHTML = generatePokemonContainer(index);
}

function checkArrow(orientation, index) {
    let value = index
    if(orientation == 'back') {
        value--;
    } else {
        value++;
    }
    loadPokemonCard(value);
}

function openCard() {
    document.getElementById('pokedexContainer').style.display = 'flex';
}

function closeCard() {
    document.getElementById('pokedexContainer').style.display = 'none';
}