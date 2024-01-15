let currentPokemon;

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/charmander`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('Loaded pokemon', currentPokemon);

    renderPokemonInfo();
    renderPokemonType();
}

function renderPokemonInfo() {
    let content = document.getElementById('pokedex');
    content.innerHTML = generatePokemonInfo();
    document.getElementById('pokemonName').innerHTML = currentPokemon.name;
}

function renderPokemonType() {
    let typeContent = document.getElementById('pokemonTypes');
    let pokemonTypeArr = currentPokemon.types;
    typeContent.innerHTML = '';
    for(let i = 0; i < pokemonTypeArr.length; i++) {
        typeContent.innerHTML += generatePokemonType(pokemonTypeArr[i].type.name);
    }
}

function generatePokemonType(type) {
    return /*html*/`
        <div class="type"><span>${type}</span></div>
    `;
}

function generatePokemonInfo() {
    return /*html*/`
        <main>
            <section class="minHeight">
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
            <section id="content">
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