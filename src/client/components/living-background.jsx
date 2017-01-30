import React, { Component } from 'react';
import {easeInCubicTiming} from '../utils.js';

const gradients = [
	{ background: '#00000c' },
	{ background: 'linear-gradient(to bottom, #020111 85%,#191621 100%)' },
	{ background: 'linear-gradient(to bottom, #020111 60%,#20202c 100%)' },
	{ background: 'linear-gradient(to bottom, #020111 10%,#3a3a52 100%)' },
	{ background: 'linear-gradient(to bottom, #20202c 0%,#515175 100%)' },
	{ background: 'linear-gradient(to bottom, #40405c 0%,#6f71aa 80%,#8a76ab 100%)' },
	{ background: 'linear-gradient(to bottom, #4a4969 0%,#7072ab 50%,#cd82a0 100%)' },
	{ background: 'linear-gradient(to bottom, #757abf 0%,#8583be 60%,#eab0d1 100%)' },
	{ background: 'linear-gradient(to bottom, #82addb 0%,#ebb2b1 100%)' },
	{ background: 'linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)' },
	{ background: 'linear-gradient(to bottom, #b7eaff 0%,#94dfff 100%)' },
	{ background: 'linear-gradient(to bottom, #9be2fe 0%,#67d1fb 100%)' },
	{ background: 'linear-gradient(to bottom, #90dffe 0%,#38a3d1 100%)' },
	{ background: 'linear-gradient(to bottom, #57c1eb 0%,#246fa8 100%)' },
	{ background: 'linear-gradient(to bottom, #2d91c2 0%,#1e528e 100%)' },
	{ background: 'linear-gradient(to bottom, #2473ab 0%,#1e528e 70%,#5b7983 100%)' },
	{ background: 'linear-gradient(to bottom, #1e528e 0%,#265889 50%,#9da671 100%)' },
	{ background: 'linear-gradient(to bottom, #1e528e 0%,#728a7c 50%,#e9ce5d 100%)' },
	{ background: 'linear-gradient(to bottom, #154277 0%,#576e71 30%,#e1c45e 70%,#b26339 100%)' },
	{ background: 'linear-gradient(to bottom, #163C52 0%,#4F4F47 30%,#C5752D 60%,#B7490F 80%, #2F1107 100%)' },
	{ background: 'linear-gradient(to bottom, #071B26 0%,#071B26 30%,#8A3B12 80%,#240E03 100%)' },
	{ background: 'linear-gradient(to bottom, #010A10 30%,#59230B 80%,#2F1107 100%)' },
	{ background: 'linear-gradient(to bottom, #090401 50%,#4B1D06 100%)' },
	{ background: 'linear-gradient(to bottom, #00000c 80%,#150800 100%)' },
	{ background: '#00000c' }
];

export default class LivingBackground extends Component {

	constructor(props) {
		super(props);
		this.state = {
			current: 0,
			previous: 0
		}
		this.startTime = null;
		this.animateChange = this.animateChange.bind(this);
	}

	changeGradient(newIndex) {
		let {current, previous} = this.state;
		previous = current;
		this.setState({current: newIndex, previous}, _ => {
			this.refs.previousOverlay.style.opacity = 1;
			this.startTime = Date.now();
			this.animateChange();
		})
	}

	animateChange() {
		const now = Date.now();
		const current = now - this.startTime;
		const opacity = easeInCubicTiming(current, 1, -1, 300);
		const elm = this.refs.previousOverlay;
		elm.style.opacity = opacity;
		if( elm.style.opacity <= 0 ) {
			elm.style.opacity = 0;
			return;
		}
		requestAnimationFrame(this.animateChange);
	}

	componentWillMount() {
		const now = new Date().getHours() - 1
		this.setState({
			current: now,
			previous: now
		});
	}

	componentDidMount() {
		setInterval(_ => {
			const now = new Date().getHours() - 1;
			if( now != this.state.current ) {
				this.changeGradient(now);
			}
		}, 1000 * 10)
	}

	render() {
		return (
			<div className="living-background" style={gradients[this.state.current]} onClick={_ => this.changeGradient() }>
				<div className="living-background-overlay" style={gradients[this.state.previous]} ref="previousOverlay"></div>
				<div className="living-background-inner">{this.props.children}</div>
			</div>
		);
	}
}