const express = require('express')
const Sequelize = require('sequelize')
const cors = require('cors')


const app = express()
const portServer = 5050

const connection = new Sequelize('pokedex','root', '123', {
	host: 'localhost',
	dialect: 'mariadb'
})

const tablePokemons = connection.define('pokemons',{
	name: {
		type: Sequelize.DataTypes.STRING 
	},
	type1:{
		type: Sequelize.DataTypes.STRING
	},
	type2: {
		type: Sequelize.DataTypes.STRING
	},
	generation: {
		type: Sequelize.DataTypes.STRING
	}
})

app.use(cors())
app.get('/:id', function(req,res){
	const parameters = req.params.id

	tablePokemons.findAll({
		where:{
			id: parseInt(parameters)
		}
	})
	.then( function(pokemon){
		const pok = pokemon[0].dataValues

		res.send(JSON.stringify(pokemon[0].dataValues))
		console.log(pok)
	})
	.catch(function(err){
		res.send({ 'error': 'error on Request dades'  })	
		console.log(err)
	})
	
})

app.listen(portServer, () => console.log('Servidor aos 30'))
