import React from 'react'
import './App.css'

import Pokemon from './Pokemon'
import SearchBar from './SearchBar'


class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            nameSearching: '',
            pokemonsToShow: Array(15).fill().map((a,i)=> i+1), //[1,2,3,4],
            pokemons: Array(200).fill({ name: null, id:null, types:[null,null] })
        }

        this.requestApiForSavePokemons(200)

        this.setInputSearch = this.setInputSearch.bind(this)
    }

    makeArray (start, end) {
        const array = []
        for (let i = start+1; i <= end; i++) {
            array.push(i)
        }
        return array
    }

    requestApiForSavePokemons(pokemonsForRequest) {
        let array = Array(pokemonsForRequest)
        for(let id=1; id <= pokemonsForRequest; id++){
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`
            const request = fetch(url).then( i => i.json() )
        
            request.then( pok => {
                const dades = {
                    name: pok.name || null,
                    types: [ 
                        pok.types[0].type.name || null, 
                        pok.types[1] ? pok.types[1].type.name : pok.types[0].type.name
                    ]
                }
                 return dades
                })
            .then( dades => {
                array[id] = dades
            })
        }
        console.log(this.state)
        setTimeout( i => this.setState({ pokemons: array}), 2000)
        //this.setState({ pokemons: array})
    }

    setInputSearch(event){
        const value = event.target.value
        this.setState({ nameSearching: value })
        this.handleSearch()
        //console.log(this.state.pokemonsToShow)
    }

    handleSearch(){
        const nameInSearch = this.state.nameSearching
        if(!nameInSearch) return

        const pokemonsFiltered = this.state.pokemons.map(
            (pokemon) => {
                if(pokemon.name.includes(nameInSearch))
                    return pokemon.id
            }
        )
        .filter( i=> i )
        
        this.setState({
            pokemonsToShow: pokemonsFiltered
        })
        this.updatePokemons()
    }

    render(){
        console.log(this.state)
        return (
            <div>
                <header>
                    <SearchBar valueInputSearch={this.state.nameSearching} setInputSearch={this.setInputSearch} />
                </header>
                <section className='pokemons'> 
                    {this.state.pokemonsToShow.map(  ids =>  <Pokemon id={ids} name={this.state.pokemons[ids].name} types={this.state.pokemons[ids].types}/>)}         
                </section>
            </div>
        )
    }
}

export default App