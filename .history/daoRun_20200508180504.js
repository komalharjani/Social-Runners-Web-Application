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
(function () {

	var nano = require('nano');

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
						return nano.db.create(db_name) // create the database
							.then(body => console.log(`database ${db_name} created!`))
					}
					else {
						console.log(`error getting database ${db_name}!`);
						throw err; //we do not want to catch errors here - let the calling function deal with them!
					}
				});
		}

		insertRun(id, run) {
			console.log(this._db.insert(id));
			return this._db.insert(run, id);
		}

		getRuns(id) {
			//return this._db.get('origin', origin).then ( body => body.rows );
			return this._db.get(id).then(body => body.rows);
		}

		getAll() {
			return this._db.list({ include_docs: true }).then((body) => {
				body.rows.forEach((doc) => {
					console.log(doc.doc);
					return doc.doc;
					//console.log(JSON.stringify(doc.doc));
				});
			});
		}

		function(doc) {
    if(doc.tags.length > 0) {
        for(var idx in doc.tags) {
            emit(doc.tags[idx], null);
        }
    }
}

		getRunsType(type) {
			return this._db.get('type', 'run', {keys: [type]}).then ( body => body.rows );
		}

		hello() {
			this._db.view('type', 'runs')
				.then(body => {
					let run = new Object();
					for (let a of body.rows) {
						run[a.id] = a.value;
					}
					return run;
				})
				.catch(err => console.log(err))
		}

		getFilm(id) {
			return this._db.get(id);
		}
	}

	



	//make the dao accessible from outside the module
	var moduleExports = { DAORun: DAORun };
	module.exports = moduleExports;
})();
