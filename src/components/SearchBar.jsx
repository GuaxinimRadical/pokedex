import React from 'react'

import 'bootstrap/dist/js/bootstrap.bundle'
import 'popper.js'
import $ from 'jquery'

import './SearchBar.css'
 

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
    }

    click(but){
        $(but.target).button('toggle')

        const numberGeneration = parseInt(but.target.innerText)
        const newStateForGeneration = !!but.target.classList[2] 

        if(newStateForGeneration){
            this.props.generationsForShow.add(numberGeneration)
        } else {
            this.props.generationsForShow.delete(numberGeneration)
        }
	    this.props.handleSearch()
    }

    render(){
        return(
            <div className='bar mt-3 mb-3'>
                <div className="btn-toolbar geracoes mr-2" role="toolbar" aria-label="Toolbar com grupos de botões"> 
                    <div className="btn-group" role="group" aria-label="Primeiro grupo">
                        <button type="button" className="btn btn-secondary">Geração: </button>
                        <button type="button" onClick={ i => this.click(i)} className="btn btn-outline-secondary">1</button>
                        <button type="button" onClick={ i => this.click(i)} className="btn btn-outline-secondary">2</button>
                        <button type="button" onClick={ i => this.click(i)} className="btn btn-outline-secondary">3</button>
                        
                    </div>
                </div> 

                <div className="input-group mb-3 busca">
                    <input type="text" className="form-control" onChange={(event) => this.props.setInputSearch(event)} placeholder="Nome..." aria-label="Usuário" aria-describedby="basic-addon1"></input>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                    </div>
                </div>

                {/* <div className="dropdown prioridade">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Prioridade: <p>Id</p>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Id</a>
                        <a className="dropdown-item" href="#">Nome</a>
                    </div>
                </div> */} 
            </div>
        )
    }

}
