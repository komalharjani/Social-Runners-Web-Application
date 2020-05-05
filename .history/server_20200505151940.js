var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) //optional but useful for url encoded data
var config = require('./config-db.js');
var model = require('./model');
var dao = require('./dao');
const session = require('express-session');
const Expression = require('couchdb-expression')(session);
const timeOut = 1000 * 60 * 60 * 2;

const bcrypt = require('bcrypt');
app.use(express.json());

//Add a User
app.put('/addUser/:id', async (req, res) => {
	let id = req.params.id;
	console.log(`Adding ${id}`);
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(req.body.password, salt)
	const user = { name: req.body.name, password: hashedPassword, email: req.body.email, age: req.body.age }
	db.insertUser(id, user)
		.then(user_id => {
			res.status(200).end(`Sign Up successful: '${body.name}'`);
		})
		.catch(err => {
			console.log(err);
			res.status(500).end(`This email:'${body.email}' has already been used to sign up.`);
		});
});

//Get User Info to Display on Dashboard based on ID
app.get('/getUsers/:id', function (req, res) {
	let id = req.params.id;
	db.getUser(id)
		.then(jsn => {
			let user = model.User.fromJSON(jsn); // this will do all the validation for us!
			let info = { name: user.name, age: user.age };
			res.status(200).json(info);
		})
		.catch(err => {
			console.log(err);
			res.status(500).end(`Could not get User with id ${id}`);
		});
});

//check against get if password correct HERE
app.put('/userLogin/:id', async (req, res) => {
	let id = req.params.id;
	try {
		let jsn = db.getUser(id);
		//.then(jsn => {
			let user = model.User.fromJSON(jsn); // this will do all the validation for us!
			let dbpass = user.password;
			console.log(dbpass);
			let inputpass = req.body.password;
			console.log(inputpass);
			if (await bcrypt.compare(req.body.password, user.password)) {
				res.status(200).json(`Login Successful`);
			}
			else {
				res.send(`Incorrect details. Please try again`);
			}
	//})
	}
	catch {
		res.status(500).end(`This email does not exist.`);
	}
	// if(dbpass === inputpass) {
	// 	res.status(200).json(`Login Successful`);
	// 	//REDIRECT
	// 	//CREATE SESSION
	// 	//REPLACE DASHBOARD WITH SESH ID INFO
	// 	//MAKE PAGES HIDDEN - or login required
	// }
	// if(dbpass !== inputpass) {
	// res.status(500).end(`Incorrect details. Please try again`);
	// }

	//If Email Doesn't Exist

});

app.use(express.static('content'));

// set up and intitialise the database 
var db = new dao.DAO(config.db_info.url, config.db_info.username, config.db_info.password);
db.init(config.db_info.database)
	//only start listening once the database initialisation has finished
	.then(body => app.listen(3000, () => { console.log("listening on port 3000") }))
	.catch(err => console.log('Not listening: database could not be initialised', err))