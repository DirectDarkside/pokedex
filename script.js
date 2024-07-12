/**
 * @module ScriptJS
 */
let previousUrl;
let pokemonList;
let nextUrl;
let pokemonStatsName = [];
let pokemonStatsNumber = [];
let evolutionList = [];
let currentIndex = 0;

/**
 * Initializes the application by loading the pokemon list.
 *
 * @return {void} This function does not return anything.
 */
function init() {
  loadPokemonList();
}

/**
 * Fetches data from the specified URL and returns it as a JSON object.
 *
 * @param {string} link - The URL to fetch data from.
 * @return {Promise<Object>} A Promise that resolves to the fetched data as a JSON object.
 */
async function getFetch(link) {
  const response = await fetch(link);
  const responseAsJson = await response.json();
  return responseAsJson;
}

/**
 * Fetches a specific Pokemon data from the PokeAPI based on the provided ID.
 *
 * @param {number} id - The ID of the Pokemon to fetch.
 * @return {Promise<Object>} A Promise that resolves to the fetched Pokemon data as a JSON object.
 */
async function getFetchPokemonId(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const responseAsJson = response.json();
  return responseAsJson;
}

/**
 * Changes the active state of the category elements.
 *
 * @param {number} index - The index of the category element to set as active.
 * @return {void}
 */
function changeActive(index) {
  const categorys = document.querySelectorAll(".category");
  categorys.forEach((category) => {
    category.classList.remove("active");
  });
  categorys[index].classList.add("active");
}

/**
 * Asynchronously loads a list of Pokemon from the PokeAPI and renders it on the page.
 *
 * @return {Promise<void>} A Promise that resolves when the Pokemon list is loaded and rendered.
 */
async function loadPokemonList() {
  try {
    let responseAsJson = await getFetch(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    );
    pokemonList = responseAsJson.results;
    renderPokemonList(pokemonList);
    setButtonAttribute(responseAsJson);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Asynchronously loads a new list of Pokemon and updates the current list.
 *
 * @param {Event} event - The event triggering the function.
 * @return {Promise<void>} A Promise that resolves once the new list is loaded and displayed.
 */
async function loadNewPokemonList(event) {
  document.getElementById("nextButton").disabled = true;
  let responseAsJson = await getFetch(nextUrl);
  responseAsJson.results.forEach((result) => pokemonList.push(result));
  currentIndex += 20;
  newPokemonListFunktion(responseAsJson);
}

/**
 * Renders a new Pokemon list based on the response data.
 *
 * @param {Object} responseAsJson - The JSON response containing the Pokemon data.
 * @return {void}
 */
function newPokemonListFunktion(responseAsJson) {
  renderPokemonList(pokemonList);
  setButtonAttribute(responseAsJson);
  setTimeout(() => {
    document.getElementById("nextButton").disabled = false;
  }, 1000);
}

/**
 * Renders a list of Pokemon based on the provided data.
 *
 * @param {Array} pokemonList - The list of Pokemon data to render.
 * @return {void}
 */
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

/**
 * Sets the attribute of the "nextButton" element based on the "next" property of the provided Pokemon list.
 *
 * @param {Object} pokemonList - The Pokemon list containing the "next" property.
 * @return {void} This function does not return anything.
 */
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

/**
 * Loads a Pokemon based on the provided data and renders its type, image, and ID.
 *
 * @param {Object} pokemon - The Pokemon object to load.
 * @param {number} index - The index of the Pokemon in the list.
 * @return {void}
 */
async function loadPokemon(pokemon, index) {
  let url = pokemon.url;
  currentPokemon = await getFetch(url);
  renderPokemonType(currentPokemon, index);
  renderPokemonImage(currentPokemon, index);
  renderPokemonId(currentPokemon, index);
}

/**
 * Sets the innerHTML of an element with the id 'pokemonId' followed by the index with the id of the currentPokemon's id.
 *
 * @param {Object} currentPokemon - The current Pokemon object.
 * @param {number} index - The index of the Pokemon in the list.
 * @return {void}
 */
function renderPokemonId(currentPokemon, index) {
  document.getElementById(`pokemonId${index}`).innerHTML = currentPokemon.id;
}

/**
 * Renders the image of a Pokemon based on the provided data.
 *
 * @param {Object} pokemon - The Pokemon object containing sprite data.
 * @param {number} index - The index of the Pokemon element.
 * @return {void} No return value.
 */
function renderPokemonImage(pokemon, index) {
  document.getElementById(`pokemonImage${index}`).src =
    pokemon.sprites["front_default"];
}

/**
 * Asynchronously renders information about a specific Pokemon based on the index.
 *
 * @param {number} index - The index of the Pokemon in the list.
 * @return {void} No return value.
 */
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

/**
 * Sets the background color of the pokemon card based on the type element's color.
 *
 * @param {string} type - The type of the pokemon.
 * @param {number} index - The index of the pokemon card.
 * @param {number} j - A condition to check if it should change the background color.
 */
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

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} string - The input string.
 * @return {string} The input string with the first letter capitalized.
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Renders the Pokemon container with the specified index.
 *
 * @param {number} index - The index of the Pokemon.
 * @return {void}
 */
function renderPokemonContainer(index) {
  document.getElementById("pokedexContainer").innerHTML =
    generatePokemonContainer(index);
}

/**
 * Renders the search Pokemon container based on the specified index.
 *
 * @param {number} index - The index for rendering the container.
 * @return {void}
 */
function renderSearchPokemonContainer(index) {
  document.getElementById("pokedexContainer").innerHTML =
    generateSearchPokemonContainer();
}

/**
 * Checks the length of the list based on the specified orientation, index, and event.
 *
 * @param {string} orientation - The orientation of the list ("back" or "next").
 * @param {number} index - The index of the list.
 * @param {Event} event - The event object.
 * @return {void}
 */
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

/**
 * Stops the propagation of the given event.
 *
 * @param {Event} event - The event to stop propagation for.
 * @return {void}
 */
function stopEvent(event) {
  event.stopPropagation();
}

/**
 * Renders the search result for a given Pokemon name.
 *
 * @param {string} name - The name of the Pokemon to render.
 * @return {void} No return value.
 */
function renderSearchResult(name) {
  document.getElementById("pokemonInput").value = "";
  getPokemonSuggestions();
  openCard();
  renderSearchPokemonContainer();
  renderSearchedPokemon(name);
}

/**
 * Asynchronously fetches and displays a list of Pokemon suggestions based on the user's input.
 *
 * @return {Promise<void>} Resolves when the suggestions have been fetched and displayed.
 * @throws {Error} If there is an error fetching the Pokémon data.
 */
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

/**
 * Renders the images of the given Pokemon array in the drop-down.
 *
 * @param {Array} pokemonArray - The array of Pokemon objects.
 * @return {Promise<void>} A promise that resolves when all the images have been rendered.
 */
async function renderDropDownImage(pokemonArray) {
  for (let i = 0; i < pokemonArray.length; i++) {
    const currentPokemon = await getFetch(pokemonArray[i].url);
    document.getElementById(`dropDownPokemonImage${i}`).src =
      currentPokemon.sprites["front_default"];
  }
}
