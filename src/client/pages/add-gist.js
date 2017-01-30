import React, { Component } from 'react';
import { Link, Redirect } from 'react-router';

export default class AddGist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectTo: null
		};
	}
	submitForm(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = {};
		for( const entry of formData.entries() ) {
			data[entry[0]] = entry[1];
		}
		fetch('/api/gist/add', {
			method: 'POST', 
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin'
		}).then(response => response.json()).then(data => {
			if( 'error' in data ) {
				return console.error(data.error); 
			}
			console.log(data);
			this.setState({redirectTo: '/'})
		});
	}
	render() {
		return this.state.redirectTo ? 
			<Redirect to={{pathname: this.state.redirectTo}} /> : (
			<form className="form" onSubmit={e => this.submitForm(e)}>
				<h3> Add New Gist </h3>
				<div className="control">
					<label htmlFor="name"> Gist Name </label>
					<input id="name" name="name" type="text" placeholder="Robo Gist!" />
				</div>
				<div className="control">
					<label htmlFor="url"> Gist URL </label>
					<input id="url" name="url" type="text" placeholder="Robo Gist!" />
				</div>
				<div className="control">
					<label htmlFor="matching"> Matching Pattern </label>
					<input id="matching" name="matching" type="text" placeholder="Robo Gist!" />
				</div>
				<div className="control">
					<label htmlFor="description"> Description </label>
					<textarea id="description" name="description"></textarea>
				</div>
				<div className="control">
					<button className="save pop-button">
						save </button>
				</div>
			</form>
		);
	}
}


