const express = require('express')
const cors = require('cors')
var knex = require('knex')({
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: '123',
		database: 'pokedex'
	}
})

const app = express()
const portServer = 5050

app.use(cors())

app.get('/:id', function(req,res){
	const parameters = req.params.id
	const idPokemonOnArray = parseInt(parameters)-1

	knex.select('id', 'name', 'type1', 'type2', 'generation').from('pokemons')	
	.then( function(pokemon){
		const pok = pokemon[idPokemonOnArray]

		res.send(JSON.stringify(pok))
		console.log(pok)
	})
	.catch(function(err){
		res.send({ 'error': 'error on Request dades'  })	
		console.log(err)
	})
	
})

app.listen(portServer, () => console.log('Servidor aos 30'))
