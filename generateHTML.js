function generatePokemonList(pokemon, index, pokemonName) {
  return /*html*/ `
        <div onclick="loadPokemonCard(${index})">
            <div class="pokemonCard" id="pokemonCard${index}">
                <div>
                    <div>
                        <h2>${pokemonName}</h2>
                    </div>
                    <section id="pokemonTypes${index}">

                    </section>
                </div>
                <div class="pokemonImage">
                    <p>#<span id="pokemonId${index}"></span></p>
                    <img id="pokemonImage${index}" src="">
                </div>
            </div>
        </div>
    `;
}

function generatePokemonType(type) {
  return /*html*/ `
        <div class="type"><span>${type}</span></div>
    `;
}

function generatePokemonInfo(pokemon, pokemonName) {
  return /*html*/ `
        <section class="padding24" id="cardTop">
            <nav class="pokedexNav">
                <div onclick="closeCard()">
                <img src="./img/left-arrow-white.png">
                </div>
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
                <img src="${pokemon.sprites.other["official-artwork"].front_default}">
            </div>
            <div>
                <nav class="pokedexCategory">
                    <span onclick="renderPokemonAbout(${pokemon.id})">
                        <a>About</a>
                    </span>
                    <span onclick="renderPokemonStats(${pokemon.id})">
                        <a>Base Stats</a>
                    </span>
                    <span onclick="renderPokemonEvolution(${pokemon.id})">
                        <a>Evolution</a>
                    </span>
                    <span onclick="renderPokemonMoves(${pokemon.id})">
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
  return /*html*/ `
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

function generateSearchPokemonContainer() {
  return /*html*/ `
        <div id="pokedex">
            
        </div>
    `;
}

function generateAbout(pokemon) {
  return /*html*/ `
        <table>
            <tr>
                <td>Species</td>
                <td id="species">Seed</td>
            </tr>
            <tr>
                <td>Height</td>
                <td>${pokemon.height} dm (<span id="aboutHeight">u.k.</span> cm)</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>${pokemon.weight} hg (<span id="aboutWeight">u.k.</span> kg)</td>
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
                <td>male: <span id="male">unknown</span>%</td>
                <td>female: <span id="female">unknown</span>%</td>
            </tr>
            <tr>
                <td>Egg Groups</td>
                <td id="eggGroup">Monster</td>
            </tr>
            <tr>
                <td>Egg Cycle</td>
                <td>Grass</td>
            </tr>
        </table>
    `;
}

function generateEvolutionList() {
  return /*html*/ `
    <div>
        <div id="evolutionList">

        </div>
    </div>
`;
}

function generateNextEvolution(pokemon) {
  return /*html*/ `
        <img src="./img/bottom-arrow-black.png">
        <span>${pokemon}</span>
    `;
}
