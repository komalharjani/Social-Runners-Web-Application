
(function () {
	/* assumes you are running within Uni network - change URL to localhost:2222 if outside the network */
	var db_info = {
		url: 'localhost:2222',
		username: "kh241",
		password: "tq7tVdWL",
		database: 'sr_login',
		databaseTwo: 'sr_runs'
	};

	var moduleExports = { db_info: db_info };

	if (typeof __dirname != 'undefined')
		module.exports = moduleExports;
}());

(function run() {
	/* assumes you are running within Uni network - change URL to localhost:2222 if outside the network */
	var db_run = {
		url: 'localhost:2222',
		username: "kh241",
		password: "tq7tVdWL",
		database: 'sr_runs'
	};

	var moduleExports = { db_run: db_run };

	if (typeof __dirname != 'undefined')
		module.exports = moduleExports;
}());
