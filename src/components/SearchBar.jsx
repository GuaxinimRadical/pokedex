import React from 'react'
import './SearchBar.css'
 

export default class SearchBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            nameSearch: ''
        }
    }

    a(event){
        this.setState({ nameSearch:event.target.value })
    }

    render(){
        return(
            <div className='bar'>
                <div className="btn-toolbar geracoes" role="toolbar" aria-label="Toolbar com grupos de botões">
                    <div className="btn-group " role="group" aria-label="Primeiro grupo">
                        <span className="btn btn-secondary">Geração: </span>
                        <button type="button" className="btn btn-secondary">Todas</button>
                        <button type="button" className="btn btn-secondary">1</button>
                        <button type="button" className="btn btn-secondary">2</button>
                        <button type="button" className="btn btn-secondary">3</button>
                        <button type="button" className="btn btn-secondary">4</button>
                    </div>
                </div>

                <div className="input-group mb-3 busca">
                    <input type="text" className="form-control" onKeyUp={(event) => this.props.setInputSearch(event)} placeholder="Usuário" aria-label="Usuário" aria-describedby="basic-addon1"></input>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                    </div>
                </div>

                <div className="dropdown prioridade">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Prioridade: <p>Id</p>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Id</a>
                        <a className="dropdown-item" href="#">Nome</a>
                    </div>
                </div>
            </div>
        )
    }

}