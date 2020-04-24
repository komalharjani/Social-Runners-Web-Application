/*
	Data Access Object with:
	* constructor to create database connection
	* function to initialise the specifed database
	* function to get a document for a given id
	* function to get documents from a given view
	* function to get documents from a given view with results grouped
	* function to insert a given document with a given id
	* function to bulk insert given documents
	* function to create specified views in a design
*/
(function() {

	var nano = require('nano');

	var default_data = [{ _id:"1", name: 'Toy Story'},
						{ _id:"2", name: 'Monsters Inc'},
						{ _id:"3", name: 'Wall-E'}];

	class DAO {
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
			.then(body => console.log(`using database ${db_name}!`) )
			.catch(err => {
				//if the database does not exists create it and add some data and some views
				if ( err.reason == 'no_db_file' ) {
					return nano.db.create(db_name) // create the database
					.then( body => console.log(`database ${db_name} created!`) )
					.then( body => this.insertUsers(default_data) )
					.then( body => console.log('Data added!') )
					.then( body => console.log('Views added!') )
				}
				
				else {
					console.log(`error getting database ${db_name}!`);
					throw err; //we do not want to catch errors here - let the calling function deal with them!
				}
			});
		}

		// get a film with a particular id
		getFilm(id) {
			return this._db.get(id);
		}

		// get documents in a particular view
		getFilmsInGenre(genre) {
			return this._db.view('genres', genre).then ( body => body.rows );
		}

		// get documents in a particular view with results grouped by key
		getCountsPerGenre() {
			return this._db.view('genres', 'count', {group:true}).then( doc => doc.rows );
		}

		// insert a document with a particular id to the database
		insertFilm(id, film) {
			return this._db.insert(film, id);
		}

		// bulk insert documents to the database
		insertUsers(users){
			return this._db.bulk({docs: users})
		}

	}

	//make the dao accessible from outside the module
	var moduleExports = { DAO: DAO };
	module.exports = moduleExports;
})();