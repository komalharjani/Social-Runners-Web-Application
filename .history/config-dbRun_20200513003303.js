(function () {
	var db_info = {
		url: 'localhost:2222',
		username: "kh241",
		password: "tq7tVdWL",
		database: 'sr_runs',
	};

	var moduleExports = { db_info: db_info };

	if (typeof __dirname != 'undefined')
		module.exports = moduleExports;
}());

