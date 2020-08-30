import React from 'react'
import './App.css'

import Pokemon from './Pokemon'


function App(){
    const pokemonsRequested = 150
    const pokemonsId = []

    for (let i = 1; i <= pokemonsRequested; i++) {
        pokemonsId.push(i)
    }

    return (
        <div>
            {pokemonsId.map( ids =>  <Pokemon id={ids}/>)}
        </div>
    )
}

export default App