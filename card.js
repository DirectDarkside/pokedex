function checkArrow(orientation, index) {
  let value = index;
  if (orientation == "back") {
    value--;
  } else {
    value++;
  }
  return value;
}

function openCard() {
  document.getElementById("pokedexContainer").style.display = "flex";
}

function closeCard() {
  document.getElementById("pokedexContainer").style.display = "none";
}

async function renderSearchedPokemon(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const currentPokemon = await response.json();
  const typeArr = currentPokemon.types;
  let content = document.getElementById("pokedex");
  let pokemonName = capitalizeFirstLetter(currentPokemon.name);
  content.innerHTML = generatePokemonInfo(currentPokemon, pokemonName);
  renderPokemonCardType(currentPokemon);
  renderPokemonStats(currentPokemon.id);
  typeArr.forEach((type, index) =>
    checkBackgroundColorPokedex(type.type.name, index)
  );
}

function loadPokemonCard(index) {
  openCard();
  renderPokemonContainer(index);
  renderPokemonInfo(index);
}

async function renderGender(currentPokemon, name) {
  const maleJson = await getFetch(`https://pokeapi.co/api/v2/gender/${name}`);
  for (let i = 0; i < maleJson.pokemon_species_details.length; i++) {
    if (
      currentPokemon.name ===
      maleJson.pokemon_species_details[i].pokemon_species.name
    ) {
      const sum = (maleJson.pokemon_species_details[i].rate / 8) * 100;
      const sumString = sum.toString().replace(".", ",");
      document.getElementById(`${name}`).innerHTML = sumString;
    }
  }
}

function renderPokemonGender(currentPokemon) {
  renderGender(currentPokemon, "male");
  renderGender(currentPokemon, "female");
}

function renderPokemonCardAbilities(pokemon) {
  let typeContent = document.getElementById("abilities");
  typeContent.innerHTML = "";
  for (let i = 0; i < pokemon.abilities.length; i++) {
    typeContent.innerHTML += generatePokemonAbilities(
      pokemon.abilities[i].ability.name
    );
  }
}

function checkBackgroundColorPokedex(type, index) {
  if (index == 0) {
    typesList.forEach((typeElement) => {
      if (type == typeElement.name) {
        document.getElementById("pokedex").style.backgroundColor =
          typeElement.color;
      }
    });
  }
}

function renderPokemonEggGroup(species) {
  document.getElementById("eggGroup").innerHTML = "";
  species.egg_groups.forEach((eggGroup) => {
    document.getElementById(
      "eggGroup"
    ).innerHTML += `<span>${eggGroup.name}</span> `;
  });
}

function convertInfo(currentPokemon) {
  let height = currentPokemon.height * 10;
  let roundHeight = Math.round(height);
  document.getElementById("aboutHeight").innerHTML = roundHeight;
  let weight = currentPokemon.weight / 10;
  let textWeight = weight.toString();
  document.getElementById("aboutWeight").innerHTML = textWeight.replace(
    ".",
    ","
  );
}

async function renderPokemonSpecies(currentPokemon) {
  let species = await getFetch(currentPokemon.species.url);
  document.getElementById("species").innerHTML = species.genera[7].genus;
  renderPokemonEggGroup(species);
}

function renderPokemonCardType(pokemon) {
  let typeContent = document.getElementById("pokemonTypes");
  typeContent.innerHTML = "";
  for (let i = 0; i < pokemon.types.length; i++) {
    typeContent.innerHTML += generatePokemonType(pokemon.types[i].type.name);
  }
}

function getStats(pokemon) {
  pokemonStatsName = [];
  pokemonStatsNumber = [];
  pokemon.stats.forEach((stat) => {
    pokemonStatsName.push(stat.stat.name);
    pokemonStatsNumber.push(stat.base_stat);
  });
}

async function renderPokemonAbout(id) {
  const currentPokemon = await getFetchPokemonId(id);
  let content = document.getElementById("categoryContainer");
  changeActive(0);
  content.innerHTML = generateAbout(currentPokemon);
  renderPokemonSpecies(currentPokemon);
  convertInfo(currentPokemon);
  renderPokemonCardAbilities(currentPokemon);
  renderPokemonGender(currentPokemon);
}

async function renderPokemonStats(id) {
  changeActive(1);
  const currentPokemon = await getFetchPokemonId(id);
  let content = document.getElementById("categoryContainer");
  content.innerHTML = `<canvas id="myChart"></canvas>`;
  getStats(currentPokemon);
  renderChart(currentPokemon);
}

function renderPokemonType(pokemon, index) {
  let typeContent = document.getElementById(`pokemonTypes${index}`);
  let pokemonTypeArr = pokemon.types;
  typeContent.innerHTML = "";
  for (let i = 0; i < pokemonTypeArr.length; i++) {
    typeContent.innerHTML += generatePokemonType(pokemonTypeArr[i].type.name);
    checkBackgroundColor(pokemonTypeArr[i].type.name, index, i);
  }
}

async function renderPokemonEvolution(id) {
  changeActive(2);
  const currentPokemon = await getFetchPokemonId(id);
  let species = await getFetch(currentPokemon.species.url);
  let evolutionChain = await getFetch(species.evolution_chain.url);
  renderEvolutionChain(evolutionChain);
}

function renderEvolutionChain(chain) {
  evolutionList = [];
  document.getElementById("categoryContainer").innerHTML = "";
  let evolutionChain = chain.chain;
  checkEvolution(evolutionChain);
  document.getElementById("categoryContainer").innerHTML =
    generateEvolutionList();
  evolutionList.forEach((pokemon, index) => {
    if (index > 0) {
      document.getElementById("evolutionList").innerHTML +=
        generateNextEvolution(pokemon);
    } else {
      document.getElementById(
        "evolutionList"
      ).innerHTML += `<span>${pokemon}</span>`;
    }
  });
}

function checkEvolution(evolutionChain) {
  let firstLetterFirstPokemon = capitalizeFirstLetter(
    evolutionChain.species.name
  );
  evolutionList.push(firstLetterFirstPokemon);
  if (evolutionChain.evolves_to[0]) {
    let firstLetterSecondPokemon = capitalizeFirstLetter(
      evolutionChain.evolves_to[0].species.name
    );
    evolutionList.push(firstLetterSecondPokemon);
  }
  if (evolutionChain.evolves_to[0].evolves_to[0]) {
    let firstLetterThirdPokemon = capitalizeFirstLetter(
      evolutionChain.evolves_to[0].evolves_to[0].species.name
    );
    evolutionList.push(firstLetterThirdPokemon);
  }
}

async function renderPokemonMoves(id) {
  changeActive(3);
  const currentPokemon = await getFetchPokemonId(id);
  let content = document.getElementById("categoryContainer");
  content.innerHTML = `<div id="moves"></div>`;
  renderMove(currentPokemon);
}

function renderMove(currentPokemon) {
  let moveContainer = document.getElementById("moves");
  currentPokemon.moves.forEach((move) => {
    moveContainer.innerHTML += `<p>${move.move.name}</p>`;
  });
}
