var express = require('express');
var bodyParser = require('body-parser'); 
var app = express(); 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) //optional but useful for url encoded data
var config = require('./config-db.js');
var model = require('./model');
var dao = require('./dao');
const session = require('express-session');
const Expression = require('couchdb-expression')(session);
const timeOut = 1000 * 60 * 60 * 2;

const {
	PORT = 3000,
	NODE_ENV = 'development',
	SESS_SECRET = 'ssh!quiet,itasecret!'
} = process.env

const IN_PROD = NODE_ENV === 'production';

const store = new Expression({
	email: 'root',
	password: 'hello123',
	hostname: 'localhost',
	port: '3000',
	database: 'sr_login'
})

app.use(session({
	store: store,
	secret: SESS_SECRET,
	resave: false, 
	saveUninitialized: false,
	cookie: {
		maxAge: timeOut,
		sameSite: true,
		secure: IN_PROD
	}
}))

app.post('/login.html', (req,res) => {
	const {email, password} = req.body
	if(email && password) {
		const user = store.find(
			user => store.email === email && store.password === password
		)
		if (user) {
			req.session.userId = user.id;
			return res.redirect('/index.html');
		}
	}
})

//SESSION created after login
// app.get('/', (req, res) => {
// 	console.log(req.session);
// 	res.send('hello world');
// });

// set up all the routes
app.put('/addUser/:id', function(req,res,next) {
	let id = req.params.id;
	console.log(`Adding ${id}`);
	let body = req.body;
	let user = model.User.fromJSON(body); // this will do all the validation for us!
	db.insertUser(id, user.toJSON())
	.then( user_id => {	
		res.status(200).end(`Sign Up successful: '${body.name}'`);
	})
	.catch(err => {
		console.log(err);
		res.status(500).end(`This email:'${body.email}' has already been used to sign up.`);
	});
});

//Get User for Auth
app.get('/getUsers/:id', function(req,res,next) {
	let id = req.params.id;
	db.getUser(id)
	.then(body => {
		//let user = model.User.fromJSON(jsn); // this will do all the validation for us!
		let user = {name: body.name, age: body.age}
		console.log(user);
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
.then( body => app.listen(PORT, () => { console.log("listening on port 3000")} ))
.catch( err => console.log('Not listening: database could not be initialised', err) )