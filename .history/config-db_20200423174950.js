
(function () {
	/* assumes you are running within Uni network - change URL to localhost:2222 if outside the network */
	var db_info = {
		url: 'localhost:2222',
		username: "kh241",
		password: "tq7tVdWL",
		database: 'my_film_db'
	};

	var moduleExports = { db_info: db_info };

	if (typeof __dirname != 'undefined')
		module.exports = moduleExports;
}());
