import React from 'react'
import './App.css'

import Pokemon from './Pokemon'
import SearchBar from './SearchBar'


class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            nameSearching: '',
            pokemons: []
        }

        this.savePokemons = this.savePokemons.bind(this)
        this.setInputSearch = this.setInputSearch.bind(this)
    }

    savePokemons(name, id, types){
        this.setState({
            pokemons: [ ...this.state.pokemons, {
                name: name,
                id: id,
                types: types
            }]
        })
    }

    setInputSearch(event){
        const value = event.target.value
        this.setState({ nameSearching: value })
    }

    render(){
        const pokemonsRequested = 15
        const pokemonsId = []
    
        for (let i = 1; i <= pokemonsRequested; i++) {
            pokemonsId.push(i)
        }
        return (
            <div>
                <header>
                    <SearchBar valueInputSearch={this.state.nameSearching} setInputSearch={this.setInputSearch} />
                </header>
                <section className='pokemons'> 
                    {pokemonsId.map( ids =>  <Pokemon id={ids} savePokemons={this.savePokemons} />)}
                </section>
            </div>
        )
    }
}

export default App