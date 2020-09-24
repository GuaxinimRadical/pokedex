//FOR CREATE THE DATABASE...
/*
 *	npm install 
 *
 *	node make.js
 *
 */

//ABOUT DATABASE
/*
 * DATABASE: MariaDB
 * 
 */
const axios = require('axios')
const Sequelize = require('sequelize')

const url = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const pokemons = [] 
const pokemonsForRequest = 893

for ( let i=1; i<=pokemonsForRequest; i++ ){
	axios.get(url(i))
		.then( function(response){
			const pokemonData = response.data

			pokemons[i-1] = {
				name: pokemonData.name || null,
				id: pokemonData.id || null,
				types: pokemonData.types.map( i => i.type.name  ),
				generation: ( pokemonData.id <= 151 ? 1 : (
					pokemonData.id <= 251 ? 2 : (
					pokemonData.id <= 386 ? 3 : (
					pokemonData.id <= 493 ? 4 : (
					pokemonData.id <= 649 ? 5 : (
					pokemonData.id <= 721 ? 5 : (
					pokemonData.id <= 809 ? 6 : (
					pokemonData.id <= 896 ? 7 : 8
					) ) ) ) ) ) ) ) 
			}
		})
		.catch( (error) => console.log(`ERROR for get dades for API on request ${i}...\n`+error) )
}

//connection with the database
const connection = new Sequelize('pokedex', 'root', '123', {
	host: "localhost",
	dialect: 'mariadb'
})

//It waits 50 seconds to Set up the dades 
setTimeout( () => {
	// DATABASE
	const database = connection.define('pokemons', {
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER 
		},
		name: {
			type: Sequelize.STRING
		},
		type1: {
			type: Sequelize.STRING
		},
		type2: {
			type: Sequelize.STRING
		},
		generation: {
			type: Sequelize.INTEGER
		}
	})

	//Test if the connection with the database is right
	connection.authenticate()
		.then( function(){ 
			console.log('Deu certo meu bom :)') 
		})
		.catch(function(erro){
			console.log('FALHA ao conectar: '+erro) 
			return
		}) 

	connection.sync()
		.then( function() {
			for(let c in pokemons){
				database.create({
					id: pokemons[c].id || (c+1),
					name: pokemons[c].name,
					type1: pokemons[c].types[0],
					type2: pokemons[c].types[1],
					generation: pokemons[c].generation || 0
				})
			}
		} )
		.catch( (error) => console.log('ERROR to SET UP the dades for database...\n'+error) )
}, 50000) 
