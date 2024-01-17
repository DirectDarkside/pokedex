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

function generatePokemonInfo(pokemon, pokemonName) {
    return /*html*/`
        <section class="padding24 h50" id="cardTop">
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
            </div>
        </section>
    `;
}

function generatePokemonAbilities(ability) {
    return `
        <span>${ability}</span
    `;
}