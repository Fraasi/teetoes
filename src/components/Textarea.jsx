import React, { Component } from 'react'

export default class Textarea extends Component {
	constructor() {
		super()
		this.state = {}
	}

	render() {
		return (
			<textarea defaultValue="Paste your text here" />
		)
	}
}
