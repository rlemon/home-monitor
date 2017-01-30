import React, { Component } from 'react';
import { Link } from 'react-router';
import { page } from '../dataLoading';

// async function getUserInfo() {
//     const response = await fetch('/api/user/info', { method: 'GET', credentials: 'same-origin' });
//     const json = await response.json();
//     return json;
// }

// @page({
//     queries: {
//         user: _ => getUserInfo()
//     }
// })

export default class UserProfilePage extends Component {
	static contextTypes = {
		currentUser: React.PropTypes.object
	}

	constructor(props) {
		super(props);

	}
	render() {
		// not sure if this can be hit. we redirect on this page.
		if( this.context.currentUser === null ) {
			return <div>not authorized</div>
		}
		
		const user = this.context.currentUser;
		return (
			<div>{JSON.stringify(user)}</div>
		);
	}
}