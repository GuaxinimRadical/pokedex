import React from 'react'

import BlockType from './blockType'
import './Pokemon.css' 

export default class Pokemon extends React.Component {

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
                        { this.props.types.map( t => <BlockType type={t} /> ) }
                    </div>

                    <section className={`atributes bg-color-dark-${this.props.types[1] || this.props.types[0]}`}>
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