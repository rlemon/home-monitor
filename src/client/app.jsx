import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import './assets/style.scss';

export default class App extends Component {

	static childContextTypes = {
		currentUser: React.PropTypes.object
	}

	static async getUserInfo() {
		const response = await fetch('/api/user/info', { method: 'POST', credentials: 'same-origin' });
		const json = await response.json();

		if (json.error) {
			return null; //no user
		}
		else {
			return json.data[0];
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			currentUser: null
		}
	}

	getChildContext() {
		return { currentUser: this.state.currentUser };
	}

	handleAuthenticationChange() {
		App.getUserInfo().then(userInfo => this.setState({ currentUser: userInfo }));
	}

	componentWillMount() {
		window.authenticationCompleteCallback = _ => this.handleAuthenticationChange();
		this.handleAuthenticationChange();
	}

	render() {
		return (
			<div className="app-wrapper" ref="wrapper">

				<div className="sidebar-wrapper">
					<ul className="sidebar-nav">
						<li className="sidebar-brand">
							<a href="#">
								Home Monitor
							</a>
						</li>
						<li>
							<a className="active" href="#">
								<i className="fa fa-dashboard"></i> Dashboard
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fa fa-history"></i> History
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fa fa-video-camera"></i> Cameras
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fa fa-gear"></i> Interact
							</a>
						</li>
					</ul>
				</div>

				<div className="page-content-wrapper">
					<div className="container-fluid">
						<div className="row">
							<h1>page title</h1>
							<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem architecto quisquam rerum, exercitationem quam, aspernatur magni quaerat! Facere dolorem magni fuga, rem, vel nisi tenetur libero, atque error tempore alias.</p>
							<button onClick={_ => this.refs.wrapper.classList.toggle('toggled') }>menu</button>
						</div>
					</div>
				</div>

			</div>
		);
	}
}
/*

				<Nav loggedIn={!!this.state.currentUser} />
				{
					React.cloneElement(this.props.children, { 
						authenticationRevokedHandler: _ => this.handleAuthenticationChange(),
						loggedIn: !!this.state.currentUser
					})
				}
				<div className="container">
					<hr />
					<footer>
						<div className="row">
							<div className="col-lg-12">
								<p>Copyright &copy; rlemon.ca {(new Date()).getFullYear()}</p>
							</div>
						</div>
					</footer>

				</div>

				*/