const dotenv = require('dotenv');
const Backbone = require('backbone');
const SQLSync = require('backbone-sql').sync;
const { Pool, Client } = require('pg');

dotenv.config();

const config = {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
};


async function createDatabase(dbConfig) {
	const client = new Client(dbConfig);
	const database = process.env.DB_NAME;
	await client.connect();
	try {
		await client.query(`DROP DATABASE IF EXISTS "${database}";`);
		await client.query(`CREATE DATABASE "${database}";`);
	} catch (_err) {
		// The database might already exist, you may want to check before
		console.error(_err);
	}
	client.end();
}

createDatabase(config).then(() => {console.log('DB Setup complete');});


const Project = Backbone.Model.extend({

	// Database connection and table name are specified with the urlRoot
	urlRoot: 'postgres://username:password@localhost:27017/notes',

	// Schema defines the fields for the model's table
	schema: {
		created_at: 'DateTime',
		type: ['Integer', {nullable: false}],
		name: ['String', {unique: true, indexed: true}],
	},
});

// Kick it off by setting the model's sync to an SQLSync
Project.prototype.sync = SQLSync(Project);
