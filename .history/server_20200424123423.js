var express = require('express');
var bodyParser = require('body-parser'); 
var app = express(); 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) //optional but useful for url encoded data
app.listen(3000, () => {
	console.log('Listening on localhost:3000');
});
var config = require('./config-db.js');
var model = require('./film-model');
var dao = require('./film-dao');

// set up all the routes
app.put('/addFilm/:id', function(req,res,next) {
	let id = req.params.id;
	console.log(`Adding ${id}`);
	let body = req.body;
	let film = model.Film.fromJSON(body); // this will do all the validation for us!
	db.insertFilm(id, film.toJSON())
	.then( film_id => {	
		res.status(200).end(`Added film '${body.name}' with id ${id}`);
	})
	.catch(err => {
		console.log(err);
		res.status(500).end(`Could not add film '${body.name}' with id ${id}`);
	});
});

app.get('/getFilm/:id', function(req,res,next) {
	let id = req.params.id;
	db.getFilm(id)
	.then(jsn => {
		let film = model.Film.fromJSON(jsn); // this will do all the validation for us!
		res.status(200).json(film.toJSON());
	})
	.catch(err => {
		console.log(err);
		res.status(500).end(`Could not get film with id ${id}`);
	});
});

app.get('/getFilms/', function(req,res,next) {
	let genre = 'all';
	db.getFilmsInGenre(genre)
	.then(films => {	
		console.log(films);
		res.status(200).json(films);
	})
	.catch(err => {
		console.log(err);
		res.status(500).end(`Could not get all films`);
	});
});

app.get('/getFilms/:genre', function(req,res,next) {
	let genre = req.params.genre;
	db.getFilmsInGenre(genre)
	.then(films => {	
		console.log(films);
		res.status(200).json(films);
	})
	.catch(err => {
		console.log(err);
		res.status(500).end(`Could not get films in '${genre}' genre`);
	});
});

app.get('/getCounts', function(req,res,next) {
	db.getCountsPerGenre()
	.then(counts => {	
		res.status(200).json(counts);
	})
	.catch(err => {
		console.log(err);
		res.status(500).end(`Could not get film counts in genres`);
	});
});

app.use(express.static('content'));

// set up and intitialise the database 
var db = new dao.DAO(config.db_info.url, config.db_info.username, config.db_info.password);
db.init(config.db_info.database)
//only start listening once the database initialisation has finished
.then( body => app.listen(11722, () => { console.log("listening on port 11722")} ))
.catch( err => console.log('Not listening: database could not be initialised', err) )