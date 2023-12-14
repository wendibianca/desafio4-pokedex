/* requisição com fetch - retornando a promessa de uma resposta promise; através do método then, que quando der certo chama a função pra interpretar a resposta */
/* fetch(url)
    .then(function(response) {

        response.json()
        .then(function(responseBody) {
            console.log(responseBody)
        })

    })
    .catch(function(error) {
        console.log(error)
    })
     */

/* Funções de manipulação */

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}



pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url) //pega a lista de pokemons no servidor
        .then((response) => response.json()) // converteu a lista pra json
        .then((jsonBody) => jsonBody.results) // pegou a lista
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // transforma a lista em uma nova lista de promessas do detalhe do pokemon em json
        .then((detailRequests) => Promise.all(detailRequests)) //lista de requisições de promessa
        .then((pokemonsDetails) => pokemonsDetails)
}