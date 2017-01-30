import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class LoginPage extends Component {
	static contextTypes = {
		currentUser: React.PropTypes.object
	}
	constructor(props) {
		super(props);
	}
	componentDidUpdate() {
		const {loggedIn} = this.props;
		if( loggedIn ) {
			browserHistory.replace({
				pathname: '/'
			})
		}
	}
	openLoginPopup() {
		const loginPopup = window.open(`${window.location.origin}/login/github`, 'login', 'toolbar=0,status=0,width=548,height=325');
	}
	render() {
		return (
			<div style={{textAlign: 'center'}}>
				<button className="pop-button green" onClick={_=>this.openLoginPopup()}>Login with GitHub</button>
			</div>
		);
	}
}
