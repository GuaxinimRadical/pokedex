import React from 'react'

import BlockType from './blockType'
import './Pokemon.css' 

export default class Pokemon extends React.Component {
    constructor(props){
        super(props)

        const urlForGetPokemon = `https://pokeapi.co/api/v2/pokemon/${props.id}`
        this.requestApi(urlForGetPokemon)

        this.state = {
            name: null,
            types: [null,null]
        }
    }

    requestApi(url) {
        const request = fetch(url).then( i => i.json() )
    
        request.then( pok => {
            this.setState({ 
                name: pok.name,
                types: [
                    pok.types[0].type.name,
                    pok.types[1] ? pok.types[1].type.name : pok.types[0].type.name
                ]
            })
            this.props.savePokemons(pok.name, this.props.id, pok.types.map(i=>i.type.name) )
        })
    }

    verificationIfTypesIsRepeat(){
        const typeInSet = new Set()
        this.state.types.forEach( element => typeInSet.add(element))

        const finalArray = Array.from(typeInSet).map( t => <BlockType type={t} /> )
        return finalArray
    }

    
    render(){
        return(
            <div className="card">
                <div className = {`cardContent bg-color-${this.state.types[0]}`}>
                    <img 
                        src= {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.id}.png` }
                        alt=""
                    /> 

                    <h1>{String(this.state.name).toUpperCase()}</h1>

                    <div className='blocksOfTypes'>
                        { this.verificationIfTypesIsRepeat() }
                    </div>

                    <section className={`atributes bg-color-dark-${this.state.types[1]}`}>
                        <ul>
                            <li>#<b>{this.props.id}</b></li>
                            <li>Kanto</li>
                        </ul>
                    </section>
                    
                </div> 
            </div>
        )
    }
}