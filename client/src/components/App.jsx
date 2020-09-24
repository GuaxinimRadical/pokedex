import React from 'react'
import './App.css'

import Pokemon from './Pokemon'
import SearchBar from './SearchBar'


class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            nameSearching: '',
            generationSearching: new Set(),
            pokemonsToShow: Array(386).fill().map((array,indice)=> indice), // 1-3:386 || All:893
            pokemons: Array(387).fill({ name: null, id:null, types:[null,null], generation: null })
        }

        this.requestApiForSavePokemons(this.state.pokemons.length)

	    this.handleSearch = this.handleSearch.bind(this)
        this.setInputSearch = this.setInputSearch.bind(this)
    }

    requestApiForSavePokemons(pokemonsForRequest) {
        let array = Array(pokemonsForRequest)
        for(let id=0; id <= pokemonsForRequest; id++){
            const url = `https://pokeapi.co/api/v2/pokemon/${id+1}`
            array[id] = fetch(url).then( i => i.json() ).catch( error => console.log('Erro API: ' + error) )
        }
        Promise.all(array)
                .then( poks => {
                    const dades = (pok) => {
                        return {
                            name: pok.name || null,
                            id: pok.id || null,
                            types: pok.types.map( i => i.type.name ),
                            generation: ( pok.id <= 151 ? 1 : (
                                        pok.id <= 251 ? 2 : (
                                        pok.id <= 386 ? 3 : (
                                        pok.id <= 493 ? 4 : (
                                        pok.id <= 649 ? 5 : (
                                        pok.id <= 721 ? 5 : (
                                        pok.id <= 809 ? 6 : (
                                        pok.id <= 896 ? 7 : 8
                                        ) ) ) ) ) ) ) ) 
                        }
                    }
                    return Promise.resolve(poks.map(dades))
                })
                .then( finalArray => this.setState({ pokemons: finalArray}) )
                .catch( error => console.log('Erro seu...' + error) )
    }

    setInputSearch(event){
        const value = event.target.value
        this.setState({ nameSearching: value }, this.handleSearch)
    }

    handleSearch(){
        const nameInSearch = this.state.nameSearching
        const generationSearching = Array.from(this.state.generationSearching)

        const pokemonsFiltered = this.state.pokemons.map(
            (pokemon, indice) => {
                if( pokemon.name.includes(nameInSearch) && 
                ( !generationSearching[0] || generationSearching.includes(pokemon.generation) )
                ){
                    return indice
                } else {
                    return null
                }
            }
        )
        .filter( i => i || i===0 )        
        
        this.setState({
            pokemonsToShow: pokemonsFiltered
        })
    }

    render(){
        return (
            <div>
                <header>
                    <SearchBar valueInputSearch={this.state.nameSearching} handleSearch={this.handleSearch} setInputSearch={this.setInputSearch} generationsForShow={this.state.generationSearching} />
                </header>
                <section className='pokemons'> 
                    {this.state.pokemonsToShow.map( ids => <Pokemon id={this.state.pokemons[ids].id} name={this.state.pokemons[ids].name} types={this.state.pokemons[ids].types} generation={this.state.pokemons[ids].generation}/>)}         
                </section>
            </div>
        )
    }
}

export default App
