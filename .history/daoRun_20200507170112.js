(function(){

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
			//.then(body => //console.log(`using database ${db_name}!`) )
			.catch(err => {
				//if the database does not exists create it and add some data and some views
				if ( err.reason == 'no_db_file' ) {
					return nano.db.create(db_name) // create the database
					.then( body => console.log(`database ${db_name} created!`) )
				}
				else {
					console.log(`error getting database ${db_name}!`);
					throw err; //we do not want to catch errors here - let the calling function deal with them!
				}
			});
		}

		insertRun(id,run) {
			console.log(this._db.insert(id));
			return this._db.insert(run, id);
		}

    }

	//make the dao accessible from outside the module
	var moduleExports = { DAORun: DAORun };
	module.exports = moduleExports;
})();
