var express = require('express');
var app = express();
var basicAuth = require('basic-auth');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) //optional but useful for url encoded data
var config = require('./config-db.js');
var model = require('./model');
var dao = require('./dao');
app.use(express.json());

let users = [];

app.post('/userLogin/:id', async (req, res) => {
	let id = req.params.id;
	
		// .then(jsn => {
		// 	let user = model.User.fromJSON(jsn); // this will do all the validation for us!
		// 	let dbpass = user.password;
		// 	let inputpass = req.body.password;
			
		// })
		// //If Email Doesn't Exist
		// .catch(err => {
		// 	console.log(err);
		// 	res.status(500).end(`This email does not exist.`);
		// });
});

//Add a User
app.post('/addUser/:id', async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	console.log(`Adding ${id}`);
	//const salt = await bcrypt.genSalt();
	//const hashedPassword = await bcrypt.hash(req.body.password, salt)
	//const user = { name: req.body.name, password: password, email: req.body.email, age: req.body.age, salt: salt }
	const user = model.User.fromJSON(body);
	db.insertUser(id, user)
		.then(user_id => {
			res.status(200).end(`Sign Up successful: '${body.name}'`);
		})
		.catch(err => {
			console.log(err);
			res.status(500).end(`This email:'${body.email}' has already been used to sign up.`);
		});
});

// //Add a New Run
// app.post('/addUser/:id', async (req, res) => {
// 	let id = req.params.id;
// 	let body = req.body;
// 	console.log(`Adding New Run for ${id}`);
// 	const run = model.Run.fromJSON(body);
// 	//const user = model.User.fromJSON(body);
	
// 	db.insertUser(id, user)
// 		.then(user_id => {
// 			res.status(200).end(`Sign Up successful: '${body.name}'`);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).end(`This email:'${body.email}' has already been used to sign up.`);
// 		});
// });


//check against get if password correct HERE
// app.post('/userLogin/:id', async (req, res) => {
// 	let id = req.params.id;
// 	db.getUser(id)
// 		.then(jsn => {
// 			let user = model.User.fromJSON(jsn); // this will do all the validation for us!
// 			let dbpass = user.password;
// 			let inputpass = req.body.password;
// 			if (dbpass === inputpass) {
// 				res.status(200).end(`Login Successful`);
// 				// if (bcrypt.compare(req.body.password, user.password)) 
// 			}
// 			if (dbpass !== inputpass) {
// 				res.status(500).end(`Incorrect details. Please try again`);
// 			}
// 		})
// 		//If Email Doesn't Exist
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).end(`This email does not exist.`);
// 		});
// });

//Get User Info to Display on Dashboard based on ID -- only if logged in
app.get('/getUsers/:id', function (request, response) {
	let id = request.params.id;
	db.getUser(id)
		.then(jsn => {
			let user = model.User.fromJSON(jsn); // this will do all the validation for us!
			let info = { name: user.name, age: user.age, email: user.email };
			response.status(200).json(info);
			//response.render("id", info.email);
		})
		.catch(err => {
			console.log(err);
			response.status(500).end(`Could not get User with id ${id}`);
		});
});


app.use(express.static('content'));

// set up and intitialise the database 
var db = new dao.DAO(config.db_info.url, config.db_info.username, config.db_info.password);
db.init(config.db_info.database)
	//only start listening once the database initialisation has finished
	.then(body => app.listen(3000, () => { console.log("listening on port 3000") }))
	.catch(err => console.log('Not listening: database could not be initialised', err))