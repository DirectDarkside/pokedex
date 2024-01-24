let previousUrl;
let pokemonList;
let nextUrl;
let pokemonStatsName = [];
let pokemonStatsNumber = [];
let evolutionList = [];
let currentIndex = 0;

function init() {
  loadPokemonList();
}

async function getFetch(link) {
  const response = await fetch(link);
  const responseAsJson = await response.json();
  return responseAsJson;
}

async function getFetchPokemonId(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const responseAsJson = response.json();
  return responseAsJson;
}

function changeActive(index) {
  const categorys = document.querySelectorAll(".category");
  categorys.forEach((category) => {
    category.classList.remove("active");
  });
  categorys[index].classList.add("active");
}

async function loadPokemonList() {
  let responseAsJson = await getFetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  pokemonList = responseAsJson.results;
  renderPokemonList(pokemonList);
  setButtonAttribute(responseAsJson);
}

async function loadNewPokemonList(event) {
  let url = nextUrl;
  let responseAsJson = await getFetch(url);
  responseAsJson.results.forEach((result) => pokemonList.push(result));
  currentIndex += 20;
  setTimeout(() => {
    renderPokemonList(pokemonList);
    setButtonAttribute(responseAsJson);
  }, 250);
}

function renderPokemonList(pokemonList) {
  let pokemonListContent = document.getElementById("pokemonList");
  for (let i = currentIndex; i < pokemonList.length; i++) {
    let pokemonName = capitalizeFirstLetter(pokemonList[i].name);
    pokemonListContent.innerHTML += generatePokemonList(
      pokemonList[i],
      i,
      pokemonName
    );
    loadPokemon(pokemonList[i], i);
  }
}

function setButtonAttribute(pokemonList) {
  let nextButton = document.getElementById("nextButton");
  if (pokemonList.next) {
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
  document.getElementById(`pokemonImage${index}`).src =
    pokemon.sprites["front_default"];
}

async function renderPokemonInfo(index) {
  let pokemon = pokemonList[index];
  let currentPokemon = await getFetch(pokemon.url);
  let content = document.getElementById("pokedex");
  let pokemonName = capitalizeFirstLetter(currentPokemon.name);
  content.innerHTML = generatePokemonInfo(currentPokemon, pokemonName);
  renderPokemonCardType(currentPokemon);
  renderPokemonStats(currentPokemon.id);
  document.getElementById("pokedex").style.backgroundColor =
    document.getElementById(`pokemonCard${index}`).style.backgroundColor;
}

function checkBackgroundColor(type, index, j) {
  if (j == 0) {
    typesList.forEach((typeElement) => {
      if (type == typeElement.name) {
        document.getElementById(`pokemonCard${index}`).style.backgroundColor =
          typeElement.color;
      }
    });
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderPokemonContainer(index) {
  document.getElementById("pokedexContainer").innerHTML =
    generatePokemonContainer(index);
}

function renderSearchPokemonContainer(index) {
  document.getElementById("pokedexContainer").innerHTML =
    generateSearchPokemonContainer();
}

function checkListLength(orientation, index, event) {
  event.stopPropagation();
  value = checkArrow(orientation, index);
  let length = pokemonList.length - 1;
  if (value < 0) {
    value = pokemonList.length - 1;
  } else if (value > length) {
    value = 0;
  }
  loadPokemonCard(value);
}

function stopEvent(event) {
  event.stopPropagation();
}

function renderSearchResult(name) {
  document.getElementById("pokemonInput").value = "";
  getPokemonSuggestions();
  openCard();
  renderSearchPokemonContainer();
  renderSearchedPokemon(name);
}

async function getPokemonSuggestions() {
  const inputElement = document.getElementById("pokemonInput");
  const suggestionsElement = document.getElementById("pokemonSuggestions");

  const inputValue = inputElement.value.trim();

  if (inputValue.length === 0) {
    suggestionsElement.innerHTML = "";
    return;
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=600`
    );
    const data = await response.json();

    const matchingPokemon = data.results
      .filter((pokemon) => pokemon.name.startsWith(inputValue.toLowerCase()))
      .slice(0, 6);

    const suggestionsHTML = matchingPokemon
      .map(
        (pokemon, index) =>
          /*html */ `<div id="dropDownPokemon${index}" onclick="renderSearchResult('${pokemon.name}')">${pokemon.name} <img id="dropDownPokemonImage${index}" class="dropDownImg"></div>`
      )
      .join("");
    suggestionsElement.innerHTML = suggestionsHTML;
    renderDropDownImage(matchingPokemon);
  } catch (error) {
    console.error("Error fetching Pokémon data", error);
  }
}

async function renderDropDownImage(pokemonArray) {
  for (let i = 0; i < pokemonArray.length; i++) {
    const currentPokemon = await getFetch(pokemonArray[i].url);
    document.getElementById(`dropDownPokemonImage${i}`).src =
      currentPokemon.sprites["front_default"];
  }
}
