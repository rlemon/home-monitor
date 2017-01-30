import config from '../config';
import pg from 'pg';

const client = new pg.Client(config.psqlConnectionString);
client.connect(err => {
	if( err ) console.log('ERROR', err);
});
module.exports = client.query.bind(client);
