
(function () {
	/* assumes you are running within Uni network - change URL to localhost:2222 if outside the network */
	var db_infoRun = {
		url: 'localhost:2222',
		username: "kh241",
		password: "tq7tVdWL",
		database: 'sr_runs',
	};

	var moduleExports = { db_infoRun: db_infoRun };

	if (typeof __dirname != 'undefined')
		module.exports = moduleExports;
}());

