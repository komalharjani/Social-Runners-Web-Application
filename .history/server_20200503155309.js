var express = require('express');
var bodyParser = require('body-parser'); 
var app = express(); 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) //optional but useful for url encoded data
var config = require('./config-db.js');
var model = require('./model');
var dao = require('./dao');
=

// set up all the routes
app.put('/addUser/:id', function(req,res,next) {
	let id = req.params.id;
	console.log(`Adding ${id}`);
	let body = req.body;
	let user = model.User.fromJSON(body); // this will do all the validation for us!
	db.insertUser(id, user.toJSON())
	.then( user_id => {	
		res.status(200).end(`Successful Sign Up: '${body.name}'`);
	})
	.catch(err => {
		console.log(err);
		res.status(500).end(`This email:'${body.email}' has already been used to sign up.`);
	});
});

app.get('/getUsers/:id', function(req,res,next) {
	let id = req.params.id;
	db.getUser(id)
	.then(jsn => {
		let user = model.User.fromJSON(jsn); // this will do all the validation for us!
		res.status(200).json(user.toJSON());
	})
	.catch(err => {
		console.log(err);
		res.status(500).end(`Could not get User with id ${id}`);
	});
});


app.use(express.static('content'));

// set up and intitialise the database 
var db = new dao.DAO(config.db_info.url, config.db_info.username, config.db_info.password);
db.init(config.db_info.database)
//only start listening once the database initialisation has finished
.then( body => app.listen(3000, () => { console.log("listening on port 3000")} ))
.catch( err => console.log('Not listening: database could not be initialised', err) )