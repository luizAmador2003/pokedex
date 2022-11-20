const loadMore = document.getElementById('loadMore')
const pokemonList = document.getElementById('pokemonList')
const limit = 10
let offset = 0

const registrosMax = 151;

function carregarItensPokemon(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map((pokemon) =>`
            <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>                
            </li> 
        `).join('')
        pokemonList.innerHTML += newHtml 
        // o codigo abaixo faz a mesma coisa, porém de forma mais verbosa
        //for (let i = 0; i < pokemons.length; i++) {
        //    const pokemon = pokemons[i];
        //    pokemonList.innerHTML += convertPokToHtml(pokemon)
        //}        
    })
    .catch((error) => console.log(error))
}

carregarItensPokemon(offset, limit)
loadMore.addEventListener('click', () => {
    offset += limit;
    const qntdRecords = offset + limit
    if(qntdRecords >= registrosMax) {
        const novoLimite = registrosMax - offset
        carregarItensPokemon(offset, novoLimite)
        loadMore.parentElement.removeChild(loadMore)
    } else {
    carregarItensPokemon(offset, limit)
    }
})
