import React, { Component } from 'react';
import { Link } from 'react-router';

import logoImageMain from '../assets/logo-alt.png';


export default class Nav extends Component {
	
	static contextTypes = {
		currentUser: React.PropTypes.object
	}

	constructor(props) {
		super(props);
	}

	getAvailableLinks() {
		const {loggedIn} = this.props;
		const links = [
			{
				key: 'home',
				props: {
					to: '/'
				}
			},
			{
				key: 'addgist',
				props: {
					to: '/addgist'
				},
				authToggle: true
			},
			{
				key: 'profile',
				props: {
					to: '/profile'
				},
				authToggle: true
			},
			{
				key: 'login',
				props: {
					to: '/login'
				},
				authToggle: false
			},
			{
				key: 'logout',
				props: {
					to: '/logout'
				},
				authToggle: true
			}
		];
		const availableLinks = [];
		for( const link of links ) {
			const {key, props, authToggle = null} = link;
			if( (authToggle === true && loggedIn) || authToggle === null || (authToggle === false && !loggedIn) ) {
				availableLinks.push(<li key={key}><Link {...props} activeClassName="active">{key}</Link></li>);
			}
		}
		return availableLinks;
	}

	render() {
		return (
			<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
				<div className="container">
					
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="#"><img src={logoImageMain} /></a>
					</div>
					
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">
							{this.getAvailableLinks()}
						</ul>
					</div>

				</div>
			</nav>
		);
	}
}