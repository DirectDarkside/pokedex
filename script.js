let previousUrl;
let pokemonList;
let nextUrl;
let pokemonStatsName = [];
let pokemonStatsNumber = [];
let pokemons = [];
let evolutionList = [];

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
    renderPokemonId(currentPokemon, index);
}

function renderPokemonId(currentPokemon, index) {
    document.getElementById(`pokemonId${index}`).innerHTML = currentPokemon.id;
}

function renderPokemonImage(pokemon, index) {
    document.getElementById(`pokemonImage${index}`).src = pokemon.sprites['front_default'];
}

async function renderPokemonInfo(index) {
    let pokemon = pokemonList[index];
    let currentPokemon = await getFetch(pokemon.url);
    let content = document.getElementById('pokedex');
    let pokemonName = capitalizeFirstLetter(currentPokemon.name);
    content.innerHTML = generatePokemonInfo(currentPokemon, pokemonName, index);
    renderPokemonCardType(currentPokemon);
    renderPokemonStats(index);
    document.getElementById('pokedex').style.backgroundColor = document.getElementById(`pokemonCard${index}`).style.backgroundColor;
}

async function renderPokemonMoves(index) {
    let pokemon = pokemonList[index];
    let currentPokemon = await getFetch(pokemon.url);
    let content = document.getElementById('categoryContainer');
    content.innerHTML = `<div id="moves"></div>`; 
    renderMove(currentPokemon);
}

function renderMove(currentPokemon) {
    let moveContainer = document.getElementById('moves');
    currentPokemon.moves.forEach(move => {
        moveContainer.innerHTML += `<p>${move.move.name}</p>`;
    });
}

async function renderPokemonEvolution(index) {
    let pokemon = pokemonList[index];
    let currentPokemon = await getFetch(pokemon.url);
    let species = await getFetch(currentPokemon.species.url);
    let evolutionChain = await getFetch(species.evolution_chain.url);
    renderEvolutionChain(evolutionChain);
}

function renderEvolutionChain(chain) {
    evolutionList = [];
    document.getElementById('categoryContainer').innerHTML = '';
    let evolutionChain = chain.chain;
    checkEvolution(evolutionChain);
    document.getElementById('categoryContainer').innerHTML = generateEvolutionList();
    evolutionList.forEach(pokemon => {
        document.getElementById('evolutionList').innerHTML += `<li>${pokemon}</li>`;
    });
}

function checkEvolution(evolutionChain) {
    let firstLetterFirstPokemon = capitalizeFirstLetter(evolutionChain.species.name);
    evolutionList.push(firstLetterFirstPokemon);
    if(evolutionChain.evolves_to[0]) {
        let firstLetterSecondPokemon = capitalizeFirstLetter(evolutionChain.evolves_to[0].species.name);
        evolutionList.push(firstLetterSecondPokemon);
    } 
    if(evolutionChain.evolves_to[0].evolves_to[0]) {
        let firstLetterThirdPokemon = capitalizeFirstLetter(evolutionChain.evolves_to[0].evolves_to[0].species.name);
        evolutionList.push(firstLetterThirdPokemon);
    }
}

async function renderPokemonAbout(index) {
    let pokemon = pokemonList[index];
    let currentPokemon = await getFetch(pokemon.url);
    let content = document.getElementById('categoryContainer');
    content.innerHTML = generateAbout(currentPokemon);
    renderPokemonSpecies(currentPokemon);
    convertInfo(currentPokemon);
    renderPokemonCardAbilities(currentPokemon);
    renderPokemonGender(currentPokemon);
}

async function renderPokemonStats(index) {
    let pokemon = pokemonList[index];
    let currentPokemon = await getFetch(pokemon.url);
    let content = document.getElementById('categoryContainer');
    content.innerHTML = `<canvas id="myChart"></canvas>`;
    getStats(currentPokemon)
    renderChart(currentPokemon);
    console.log(currentPokemon);
}

function getStats(pokemon) {
    pokemonStatsName = [];
    pokemonStatsNumber = [];
    pokemon.stats.forEach(stat => {
        pokemonStatsName.push(stat.stat.name);
        pokemonStatsNumber.push(stat.base_stat);
    });
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

function convertInfo(currentPokemon) {
    let height = currentPokemon.height * 10;
    let roundHeight = Math.round(height);
    document.getElementById('aboutHeight').innerHTML = roundHeight;
    let weight = currentPokemon.weight / 10;
    let textWeight = weight.toString();
    document.getElementById('aboutWeight').innerHTML = textWeight.replace('.', ',');
}

async function renderPokemonSpecies(currentPokemon) {
    let species = await getFetch(currentPokemon.species.url);
    document.getElementById('species').innerHTML = species.genera[7].genus;
    renderPokemonEggGroup(species);
}

function renderPokemonEggGroup(species) {
    console.log(species);
    document.getElementById('eggGroup').innerHTML = '';
    species.egg_groups.forEach(eggGroup => {
        document.getElementById('eggGroup').innerHTML += `<span>${eggGroup.name}</span> `;
    });
}

function checkBackgroundColor(type, index, j) {
    if(j == 0) {
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

function renderPokemonGender(currentPokemon) {
    renderGender(currentPokemon, 'male');
    renderGender(currentPokemon, 'female');
}

async function renderGender(currentPokemon, name) {
    const maleJson = await getFetch(`https://pokeapi.co/api/v2/gender/${name}`);
    for(let i = 0; i < maleJson.pokemon_species_details.length; i++) {
        if(currentPokemon.name === maleJson.pokemon_species_details[i].pokemon_species.name) {
            const sum = (maleJson.pokemon_species_details[i].rate / 8) * 100;
            const sumString = sum.toString().replace('.', ',');;
            document.getElementById(`${name}`).innerHTML = sumString;
        }
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
    return value;
}

function checkListLength(orientation, index) {
    value = checkArrow(orientation, index);
    let length = pokemonList.length - 1;
    if(value < 0) {
        value = pokemonList.length - 1;
    } else if(value > length) {
        value = 0;
    }
    loadPokemonCard(value);
}

function openCard() {
    document.getElementById('pokedexContainer').style.display = 'flex';
}

function closeCard() {
    document.getElementById('pokedexContainer').style.display = 'none';
}