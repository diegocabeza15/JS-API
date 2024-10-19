const inputPokemonId = document.getElementById('pokemon-id');
const buscarPokemonBtn = document.getElementById('search-pokemon');
const pokemonContenedor = document.getElementById('pokemon-contenedor');

buscarPokemonBtn.addEventListener('click', buscarPokemon);

function buscarPokemon() {
    const idPokemon = inputPokemonId.value.trim();

    if (idPokemon === '') {
        mostrarError('Ingrese un ID de Pokémon');
        return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemon = data;
            const tipoPrincipal = pokemon.types[0].type.name;
            const altura = (pokemon.height / 10).toFixed(2) + ' m';
            const peso = (pokemon.weight / 10).toFixed(2) + ' kg';
            const imagen = pokemon.sprites.front_default;

            const card = `
                <li class="card">
                    <img src="${imagen}" alt="${pokemon.name}">
                    <h2>${pokemon.name}</h2>
                    <p>Tipo principal: ${tipoPrincipal}</p>
                    <p>Altura: ${altura}</p>
                    <p>Peso: ${peso}</p>
                </li>
            `;

            pokemonContenedor.innerHTML = card;
        })
        .catch(error => {
            mostrarError('No se encontró el Pokémon');
        });
}

function mostrarError(mensaje) {
    const error = `
        <p class="error">${mensaje}</p>
    `;

    pokemonContenedor.innerHTML = error;
}