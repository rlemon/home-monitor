import React, { Component } from 'react';

export default class FancyImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			src: props.src,
			loading: true
		};
	}
	componentWillMount() {
		const tmp = new Image();
		tmp.onload = _ => {
			this.setState({loading: false});
		};
		tmp.src = this.state.src;
	}
	render() {
		if( this.state.loading ) {
			return <i className="fa fa-picture-o"></i>;
		}
		return <img src={this.state.src} {...this.props} />
	}
}