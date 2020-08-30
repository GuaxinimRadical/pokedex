import React from 'react'
import './App.css'

import Pokemon from './Pokemon'

const pokemonsRequested = 150


const makeCardPokemon = id => <Pokemon id={id} />

function App(){
    let pokemonsId = []

    for (let i = 2; i <= pokemonsRequested; i++) {
        pokemonsId.push(i)
    }

    return (
        <div>
            <Pokemon id='1' type='grass' name='Bulbassaur' />

            {pokemonsId.map( ids =>  makeCardPokemon(ids))}
        </div>
    )
}

export default App