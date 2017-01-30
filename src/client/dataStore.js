// import { observable } from 'mobx';
// import bluebird from 'bluebird';

// class Gist {
// 	@observable id;
// 	@observable name;
// 	@observable description;
// 	@observable matches;
// 	@observable image;
// 	@observable url;
// 	@observable username;

// 	constructor(data) {
// 		Object.assign(this, data);
// 	}
// }

async function getGistList(offset) {
	const response = await fetch(`/api/gist/list?offset=${offset * 6}&limit=6`, { 
		method: 'GET', 
		credentials: 'same-origin'
	});
	const json = await response.json();
	return json.rows;
}
async function getGistCount() {
	const response = await fetch('/api/gist/count', { 
		method: 'GET', 
		credentials: 'same-origin'
	});
	const json = await response.json();
	if( !json.rows[0] || !('count' in json.rows[0]) ) {
		return 0;
	}
	return json.rows[0].count;
}


// function getGists() {
// 	const gists = Array(10).fill(0).map((_,i) => getGist(i));
// 	return gists;
// }

//  function getGist(id) {
// 	return new Gist({
// 		id, 
// 		name: `Gist #${id}`,
// 		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
// 		matches: '.*',
// 		image: `http://lorempizza.com/240/120/${id}`,
// 		url: 'http://example.com',
// 		username: 'rlemon'
// 	});
// }

export default { 
	getGistList,
	getGistCount
};