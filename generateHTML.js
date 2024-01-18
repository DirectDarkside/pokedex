function generatePokemonList(pokemon, index, pokemonName) {
    return /*html*/`
        <div onclick="loadPokemonCard(${index})">
            <div class="pokemonCard" id="pokemonCard${index}">
                <div>
                    <h2>${pokemonName}</h2>
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

function generatePokemonInfo(pokemon, pokemonName, index) {
    return /*html*/`
        <section class="padding24 maxH50" id="cardTop">
            <nav class="pokedexNav">
                <div onclick="closeCard()">
                <img src="./img/left-arrow-white.png">
                </div>
                <img src="./img/heart-white.png">
            </nav>
            <section class="pokemonHead">
                <h1 id="pokemonName">${pokemonName}</h1>
                <span><b>#${pokemon.id}</b></span>    
            </section>
            <section class="pokemonTypes" id="pokemonTypes">
                <div class="type"><span>type</span></div>
            </section>
        </section>
        <section id="content" class="padding24">
            <div class="pokemonImgContainer">
                <img src="${pokemon.sprites.front_default}">
            </div>
            <div>
                <nav class="pokedexCategory">
                    <span onclick="renderPokemonAbout(${index})">
                        <a>About</a>
                    </span>
                    <span onclick="renderPokemonStats(${index})">
                        <a>Base Stats</a>
                    </span>
                    <span onclick="renderPokemonEvolution(${index})">
                        <a>Evolution</a>
                    </span>
                    <span onclick="renderPokemonMoves(${index})">
                        <a>Moves</a>
                    </span>
                </nav>
                <div id="categoryContainer">

                </div>
            </div>
        </section>
    `;
}

function generatePokemonAbilities(ability) {
    return `
        <span>${ability}</span
    `;
}

function generatePokemonContainer(index) {
    return /*html*/`
        <div>
            <img src="./img/left-arrow-black.png" class="arrowImage" onclick="checkListLength('back', ${index})">
        </div>
        <div id="pokedex">
            
        </div>
        <div>
            <img src="./img/right-arrow-black.png" class="arrowImage" onclick="checkListLength('next', ${index})">
        </div>
        <div class="mobileArrows">
            <img src="./img/left-arrow-black.png" onclick="checkListLength('back', ${index})">
            <img src="./img/right-arrow-black.png" onclick="checkListLength('next', ${index})">
        </div>
    `;
}

function generateAbout(pokemon) {
    return /*html*/`
        <table>
            <tr>
                <td>Species</td>
                <td id="species">Seed</td>
            </tr>
            <tr>
                <td>Height</td>
                <td>${pokemon.height}* ( u.k. cm)</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>${pokemon.weight} lbs ( u.k kg)</td>
            </tr>
            <tr>
                <td>Abilities</td>
                <td id="abilities">Overgrow, Chlorophyl</td>
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