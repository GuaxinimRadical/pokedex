import React from 'react'

import BlockType from './blockType'
import './Pokemon.css' 

export default class Pokemon extends React.Component {
    constructor(props){
        super(props)

        const urlGetPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}`

        const request = fetch(urlGetPokemon(this.props.id)).then( i => i.json() )
    
        request.then( pok => {
            this.setState({ 
                name: pok.name,
                types: [
                    pok.types[0].type.name,
                    pok.types[1] ? pok.types[1].type.name : pok.types[0].type.name
                ]
            })
            if(props.id<20) 
                console.log(this.state)
        })

        this.state = {
            name: null,
            types: [null,null]
        }
    }

    
    render(){
        return(
            <div className="all">
                <div className = {`card bg-color-${this.state.types[0]}`}>
                    <img 
                        src= {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.id}.png` }
                        alt=""/> 

                    <h1>{String(this.state.name).toUpperCase()}</h1>

                    <div>
                        {
                            this.state.types
                                .reduce( (acumulador, i) => {
                                    if(acumulador[0]===i){
                                        return acumulador
                                    } else{
                                        return acumulador.concat(i)
                                    }
                                }, [])
                                .map( t => <BlockType type={t} /> )
                        }
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