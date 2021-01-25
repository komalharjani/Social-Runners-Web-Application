var express = require('express');
var app = express();
var basicAuth = require('basic-auth');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) //optional but useful for url encoded data
app.use(express.json());

//First Config for User Storage
var config = require('./config-db.js');
var model = require('./model');
var dao = require('./dao');
//Second Config for Run Storage
var configRun = require('./config-dbRun.js');
let daoRun = require('./daoRun');
const bcrypt = require('bcrypt');

/**
 * POST
 * Route to Add New User based on ID input from SignUp
 */
app.post('/addUser/:id', async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	//const salt = await bcrypt.genSalt();
	//const hashedPassword = await bcrypt.hash(req.body.password, salt)
	//const user = { name: req.body.name, password: password, email: req.body.email, age: req.body.age, salt: salt }
	const user = model.User.fromJSON(body);
	db.insertUser(id, user)
		.then(user_id => {
			console.log(`Adding ${id}`);
			res.status(200).end(`Sign Up successful: '${body.name}'`);

		})
		.catch(err => {
			console.log(err);
			res.status(500).end(`This email:'${body.email}' has already been used to sign up.`);
		});
});

/**
 * POST
 * Route to Add New Run with ID
 */
app.post('/addRun/:id', async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	//const run = model.Run.fromJSON(body);
	dbRun.insertRun(id, body)
		.then(run_id => {
			console.log(`Adding Run: ${id}`);
			res.status(200).end(`Run Uploaded`);
		})
		.catch(err => {
			console.log(err);
			res.status(500).end(`Not Uploaded`);
		});
});

let participants = [];
let comments = []

app.post('/addJoin/:id', async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	dbRun.insertRun(id, body)
		.then(joins => {
			res.status(200).end(`You have joined the run! Hurrah!`);
		})
		.catch(err => {
			console.log(err);
			res.status(500).end(`Could Not Join`);
		});
});

app.get('/getJoins/', function (req, res, next) {
	let type = 'joins';
	dbRun.getRunsType(type)
		.then(runs => {
			let full = ({
				runs: runs,
				joiners: participants,
				comments: comments
			})
			res.status(200).json(full);
		})
		.catch(err => {
			console.log(err);
			res.status(500).end(`Error`);
		});
});

app.get('/getRuns/', function (req, res, next) {
	let type = 'run';
	dbRun.getRunsType(type)
		.then(runs => {
			let full = ({
				runs: runs,
				joiners: participants,
				comments: comments
			})
			res.status(200).json(full);
		})
		.catch(err => {
			console.log(err);
			res.status(500).end(`Error`);
		});
});

/**
 * POST
 * LOGIN USERS HERE
 */
app.post('/userLogin/:id', async (req, res) => {
	let id = req.params.id;
	db.getUser(id)
		.then(jsn => {
			let user = model.User.fromJSON(jsn); // this will do all the validation for us!
			let dbpass = user.password;
			let inputpass = req.body.password;
			if (dbpass === inputpass) {
				res.status(200).end(`User Added`);
				// if (bcrypt.compare(req.body.password, user.password)) 
			}
			if (dbpass !== inputpass) {
				res.status(500).end(`Invalid Credentials.`);
			}
		})
		//If Email Doesn't Exist
		.catch(err => {
			console.log(err);
			res.status(500).end(`This email does not exist.`);
		});
});

/**
 * GET from ID
 * Route to Fetch User Details based on ID to display on page
 */
app.get('/getUsers/:id', function (request, response) {
	let id = request.params.id;
	db.getUser(id)
		.then(jsn => {
			let user = model.User.fromJSON(jsn); // this will do all the validation for us!
			let info = { name: user.name, age: user.age, email: user.email };
			response.status(200).json(info);
		})
		.catch(err => {
			console.log(err);
			response.status(500).end(`Could not get User with id ${id}`);
		});
});

/**
 * Route to Get All Posts from DB
 */
app.get('/getRuns/', function (req, res, next) {
	let genre = 'run';
	dbRun.getRunsType(genre)
		.then(runs => {
			let full = ({
				runs: runs,
				joiners: participants,
				comments: comments
			})
			res.status(200).json(full);
		})
		.catch(err => {
			console.log(err);
			res.status(500).end(`Error`);
		});
});


app.post('/addComment/', async (req, res) => {
	let body = req.body;
	comments.push({ id: body._id, email: body.email, name: body.name, comment: body.comment });
	res.status(200).json(comments);
});

app.use(express.static('content'));

// set up and intitialise the database 
var db = new dao.DAO(config.db_info.url, config.db_info.username, config.db_info.password);
var dbRun = new daoRun.DAORun(configRun.db_info.url, configRun.db_info.username, configRun.db_info.password)
db.init(config.db_info.database)
dbRun.init(configRun.db_info.database)

	//only start listening once the database initialisation has finished
	.then(body => app.listen(3000, () => { console.log("listening on port 3000") }))
	.catch(err => console.log('Not listening: database could not be initialised', err))