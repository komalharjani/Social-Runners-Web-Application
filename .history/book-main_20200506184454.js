var db_info = require('./config-dbRun.js').db_info;
var nano = require ('nano');
var my_nano = nano(`http://${db_info.username}:${db_info.password}@${db_info .url}`)
var mydb = my_nano.use(db_info.database);
console.log(mydb.config.db);

my_nano.db.get(db_info.database)
.then(body => console.log(`using ${db_info.database}`) )
.catch(err => {
	if ( err.reason == 'no_db_file' ) {
		console.log(`creating ${db_info.database}`);
		my_nano.db.create(db_info.database)
	}
	else { console.log(`error using ${db_info.database}`, err); }
})