import React from 'react'
import './Interface.css'

import Pokemon from './Pokemon'

const pokemonsRequested = 150


function makeCardPokemon(id){
    return(
        <Pokemon id={id} />
    )
}

function Interface(){

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

export default Interface