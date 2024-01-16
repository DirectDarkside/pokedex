let previousUrl;
let nextUrl;

async function loadPokemonList() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    console.log(responseAsJson);

    let pokemonList = responseAsJson.results;
    renderPokemonList(pokemonList);
    setButtonAttribute(responseAsJson);
}

async function loadNewPokemonList(event) {
    let link; 
    if(event == 'previous') {
        link = previousUrl
    } else link = nextUrl;
    let url = link;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson.results;
    renderPokemonList(pokemonList);
    setButtonAttribute(responseAsJson);
}

function renderPokemonList(pokemonList) {
    let pokemonListContent = document.getElementById('pokemonList');
    pokemonListContent.innerHTML = '';
    pokemonList.forEach((pokemon, index) => {
        pokemonListContent.innerHTML += generatePokemonList(pokemon, index);
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
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('Loaded pokemon', currentPokemon);

    // renderPokemonInfo();
    renderPokemonType(currentPokemon, index);
    renderPokemonImage(currentPokemon, index);
}

function renderPokemonImage(pokemon, index) {
    document.getElementById(`pokemonImage${index}`).src = pokemon.sprites['front_default'];
}

function renderPokemonInfo() {
    let content = document.getElementById('pokedex');
    content.innerHTML = generatePokemonInfo();
    document.getElementById('pokemonName').innerHTML = currentPokemon.name;
}

function renderPokemonType(pokemon, index) {
    let typeContent = document.getElementById(`pokemonTypes${index}`);
    let pokemonTypeArr = pokemon.types;
    typeContent.innerHTML = '';
    for(let i = 0; i < pokemonTypeArr.length; i++) {
        typeContent.innerHTML += generatePokemonType(pokemonTypeArr[i].type.name);
    }
}

function generatePokemonList(pokemon, index) {
    return /*html*/`
        <div>
            <div class="pokemonCard">
                <div>
                    <h2>${pokemon.name}</h2>
                    <section id="pokemonTypes${index}">

                    </section>
                </div>
                <div class="pokemonImage">
                    <img id="pokemonImage${index}" src="">
                </div>
            </div>
        </div>
    `;
}

function generatePokemonType(type) {
    return /*html*/`
        <div class="type"><span>${type}</span></div>
    `;
}

function generatePokemonInfo() {
    return /*html*/`
        <main>
            <section class="minHeight padding24">
                <nav class="pokedexNav">
                    <img src="./img/left-arrow-white.png">
                    <img src="./img/heart-white.png">
                </nav>
                <section class="pokemonHead">
                    <h1 id="pokemonName">Name</h1>
                    <span><b>#001</b></span>    
                </section>
                <section class="pokemonTypes" id="pokemonTypes">
                    <div class="type"><span>type</span></div>
                </section>
            </section>
            <section id="content" class="padding24">
                <div class="pokemonImgContainer">
                    <img src="${currentPokemon.sprites.front_default}">
                </div>
                <div>
                    <nav class="pokedexCategory">
                        <a href="">About</a>
                        <a href="">Base Stats</a>
                        <a href="">Evolution</a>
                        <a href="">Moves</a>
                    </nav>
                    <table>
                        <tr>
                            <td>Species</td>
                            <td>Seed</td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>${currentPokemon.height}* ( u.k. cm)</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>${currentPokemon.weight} lbs ( u.k kg)</td>
                        </tr>
                        <tr>
                            <td>Abilities</td>
                            <td>Overgrow, Chlorophyl</td>
                        </tr>
                    </table>
                    <table>
                        <th>Breeding</th>
                        <tr>
                            <td>Gender</td>
                            <td>87.5%</td>
                            <td>12.5%</td>
                        </tr>
                        <tr>
                            <td>Egg Groups</td>
                            <td>Monster</td>
                        </tr>
                        <tr>
                            <td>Egg Cycle</td>
                            <td>Grass</td>
                        </tr>
                    </table>
                </div>
            </section>
        </main>
    `;
}
