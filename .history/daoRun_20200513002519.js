/*
	Data Access Object with:
	* function to get documents from a given view
	* constructor to create database connection
	* function to create views 
	* function to get runs by type in map
	* function to insert run with id

*/
(function () {

	var nano = require('nano');

	var run_views = {
		all: {
			map: function (doc) { 
				if (doc.origin) { 
					emit(doc.type, doc); 
				} 
			}
		},
		run: {
			map: function (doc) {
				if(doc.type == 'run') {
					emit(doc.id, doc);
				}
			}
		},
		comments: {
			map: function (doc) {
				if(doc.type == 'comments') {
					emit(doc.id, doc);
				}
			} 
		},
		joins: {
			map: function (doc) {
				if(doc.type == 'joins') {
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

		init(db_name) {
			this._db = nano.use(db_name);
			//check if the database exists
			return nano.db.get(db_name)
				.then(body => console.log(`using database ${db_name}!`))
				.catch(err => {
					//if the database does not exists create it
					if (err.reason == 'no_db_file') {
						//create db 
						return nano.db.create(db_name) 
							.then(body => console.log(`database ${db_name} created!`))
							.then( body => this.createViews('runs', run_views) )
					}
					else {
						console.log(`error getting database ${db_name}!`);
						throw err;
					}
				});
		}

		/**
		 * 
		 * @param {*} design 
		 * @param {*} views 
		 */
		createViews(design, views) {
			return this._db.insert( { "views": views }, '_design/'+design )
		}

		/**
		 * 
		 * @param {*} type 
		 */
		getRunsType(type) {
			return this._db.view('runs', type).then ( body => body.rows );
		}

		/**
		 * 
		 * @param {*} id 
		 * @param {*} run 
		 */
		insertRun(id, run) {
			return this._db.insert(run, id);
		}

		getRuns(id) {
			//return this._db.get('origin', origin).then ( body => body.rows );
			return this._db.get(id).then(body => body.rows);
		}

	}

	//make the dao accessible from outside the module
	var moduleExports = { DAORun: DAORun };
	module.exports = moduleExports;
})();
