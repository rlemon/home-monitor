import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class LogoutPage extends Component {
	constructor(props) {
		super(props);
		fetch('/logout', {
			method: 'POST',
			credentials: 'same-origin' 
		}).then(results => {
			props.authenticationRevokedHandler();
		}).catch(err => {
			console.error(err);
		})
	}
	componentDidUpdate() {
		const {loggedIn} = this.props;
		if( !loggedIn ) {
			// is this a good idea? 
			browserHistory.replace({
				pathname: '/login'
			});
		}
	}
	render() {
		return (
			<div>Logging you out...</div>
		);
	}
}
