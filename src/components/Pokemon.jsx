import React from 'react'

import BlockType from './blockType'
import './Pokemon.css' 

export default class Pokemon extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            name: this.props.name,
            types: this.props.types 
        }
    }

    verificationIfTypesIsRepeat(){
        const typeInSet = new Set()
        this.props.types.forEach( element => typeInSet.add(element))

        const finalArray = Array.from(typeInSet).map( t => <BlockType type={t} /> )
        return finalArray
    }

    
    render(){
        return(
            <div className="card">
                <div className = {`cardContent bg-color-${this.props.types[0]}`}>
                    <img 
                        src= {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.id}.png` }
                        alt=""
                    /> 

                    <h1>{String(this.props.name).toUpperCase()}</h1>

                    <div className='blocksOfTypes'>
                        { this.verificationIfTypesIsRepeat() }
                    </div>

                    <section className={`atributes bg-color-dark-${this.props.types[1]}`}>
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