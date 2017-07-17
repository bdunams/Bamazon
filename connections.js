const Promises = require('bluebird');
const MySQL = require('mysql');

Promises.promisifyAll(require("mysql/lib/Connection").prototype);
Promises.promisifyAll(require("mysql/lib/Pool").prototype);

let bamazon = MySQL.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Mutlaq66",
	database: "bamazon"
});

let allConnections = {
	'Bamazon' : bamazon
};

module.exports = allConnections;