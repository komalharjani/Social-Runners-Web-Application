/*
	Data Access Object with:
	* constructor to create database connection
	* function to initialise the specifed database
	* function to get a document for a given id
*/
(function () {

	var nano = require('nano');

	//create view
	//get View

	var run_views = {
		all: {
			map: function (doc) { if (doc.origin) { emit(doc.type); } }
		},
		run: {
			map: function (doc) {
				if(doc.type == 'run') {
					emit(doc.id, doc);
				}
			}
		},
		count: {
			map: function (doc) { if(doc.origin) { emit(doc.type, 1); } },
			reduce: function (key,values,rereduce) { return sum(values); }
		}
	}
	class DAORun {
		constructor(url, user, pword) {
			console.log(`URL: http://${user}:******@${url}`);
			nano = nano(`http://${user}:${pword}@${url}`);
			this._db = null;
		}

		//initialise the database should be called immediately after the constructor!
		init(db_name) {
			this._db = nano.use(db_name);
			//check if the database exists
			return nano.db.get(db_name)
				.then(body => console.log(`using database ${db_name}!`))
				.catch(err => {
					//if the database does not exists create it and add some data and some views
					if (err.reason == 'no_db_file') {
						//create db 
						return nano.db.create(db_name) // create the database
							.then(body => console.log(`database ${db_name} created!`))
							.then( body => this.createViews('runs', run_views) )
					}
					else {
						console.log(`error getting database ${db_name}!`);
						throw err; //we do not want to catch errors here - let the calling function deal with them!
					}
				});
		}

		createViews(design, views) {
			return this._db.insert( { "views": views }, '_design/'+design )
		}

		getRunsType(type) {
			return this._db.view('runs', type).then ( body => body.rows );
		}

		insertRun(id, run) {
			console.log(this._db.insert(id));
			return this._db.insert(run, id);
		}

		getRuns(id) {
			//return this._db.get('origin', origin).then ( body => body.rows );
			return this._db.get(id).then(body => body.rows);
		}

		//get RunID
		joinRunUpdate(id, revId, email) {
			mydb.insert({ participant: email, _rev: body._rev}, body._id);
			//update name and 
		}

	}

	//make the dao accessible from outside the module
	var moduleExports = { DAORun: DAORun };
	module.exports = moduleExports;
})();
