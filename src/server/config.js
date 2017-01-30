import fs from 'fs';

const NODE_ENV = process.env.NODE_ENV || 'development';

let secrets;

try {
	let secretsText = fs.readFileSync('./secrets.json');
	secrets = JSON.parse(secretsText);
}
catch (ex) {
	console.error(ex);
	console.log('Make sure there is a secrets.json in the project root. Example of the format in secrets.sample.json.');
	process.exit(1);
}

export default secrets;
