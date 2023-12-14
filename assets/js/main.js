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


const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

/*  1, 2, 3, 4, 5           0-5
    6, 7, 8, 9, 10          5-5
    11                      10-5 (remove botão)*/



function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
                const newHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
        
                        <img src="${pokemon.photo}"
                             alt="${pokemon.name}">
                    </div>
                </li>
            `).join('')
            pokemonList.innerHTML += newHtml
        })
    }


    

loadPokemonItems(offset,limit)





loadMoreButton.addEventListener('click', ()=>{
    offset+= limit
    const qtRecordsNexPage = offset + limit

    if(qtRecordsNexPage >= maxRecords){
        const newLimit = maxRecords -offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonItems(offset, limit)
    }
    
})