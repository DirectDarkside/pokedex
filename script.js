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
    document.getElementById('pokemonName').innerHTML = currentPokemon.name;
    let content = document.getElementById('content');

    content.innerHTML = generatePokemonInfo();
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
    `;
}