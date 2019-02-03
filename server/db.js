const MongoClient = require('mongodb').MongoClient;

// Connection URL
const db_user = process.env.MONGODB_USER;
const db_password = process.env.MONGODB_PASS;
const db_uri = process.env.MONGODB_URI;
const url = `mongodb://${db_user}:${db_password}@${db_uri}`;

var options = {
	server: {
		socketOptions: {
			keepAlive: 300000,
			connectTimeoutMS: 30000
		}
	},
	replset: {
		socketOptions: {
			keepAlive: 300000,
			connectTimeoutMS: 30000
		}
	}
};


var connect = function(callback){
	MongoClient.connect(url, options, function(err, client) {
		if( err ) {
			throw err;
		}
		callback(client);
	});
}

module.exports = {
	MongoClient: MongoClient,
	url: url,
	connect: connect
};
