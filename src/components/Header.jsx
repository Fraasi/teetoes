import React, { Component } from 'react'
import Controllers from './Controllers.jsx';

export default class Header extends Component {

	render() {
		return (
			<header className="header">
				Teetoes text to speech

				<Controllers />
			</header>
		);
	}
}
