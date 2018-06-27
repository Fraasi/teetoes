/* eslint-disable max-len, jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react'

export default class Controllers extends Component {
	constructor() {
		super()
		this.state = {
			playing: false,
			voices: null,
		}
		this.handleControllerClicks = this.handleControllerClicks.bind(this)
		// this.textElem = document.querySelector('textarea');
	}

	componentDidMount() {
		// https://texttospeech.googleapis.com/v1beta1/text:synthesize

		// requestBody = {
		//   "audioConfig": {
		// 	"audioEncoding": "LINEAR16",
		// 	"pitch": "0.00",
		// 	"speakingRate": "1.00"
		//   },
		//   "input": {
		// 	"text": "Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 32 voices, available in multiple languages and variants. It applies DeepMind’s groundbreaking research in WaveNet and Google’s powerful neural networks to deliver the highest fidelity possible. As an easy-to-use API, you can create lifelike interactions with your users, across many applications and devices."
		//   },
		//   "voice": {
		// 	"languageCode": "en-US",
		// 	"name": "en-US-Wavenet-D"
		//   }
		// }
		const voicesEl = document.querySelector('#voices');
		// fetch(`https://texttospeech.googleapis.com/v1beta1/voices?languageCode=fi&key=${process.env.G_API_KEY}`)
		fetch(`https://texttospeech.googleapis.com/v1beta1/voices?&key=${process.env.G_API_KEY}`)
			.then(resp => resp.json())
			.then((voices) => {
				console.log(voices)
				voices.voices.forEach((voice) => {
					if (!voice.name.includes('Wavenet')) {
						const option = document.createElement('option')
						option.value = voice.name
						option.text = voice.name
						if (voice.name === 'en-US-Standard-D') option.setAttribute('selected', 'selected')
						voicesEl.add(option)
					}
				})
			})
			.catch(err => console.log(err))
	}

	handleControllerClicks(e) {
		console.log(e, e.target)
		this.setState({
			playing: !this.state.playing,
		})
		const text = document.querySelector('textarea').value
		console.log(e.target, text)
	}

	render() {
		return (
			<div>
				<div onClick={this.handleControllerClicks}>

					{
						this.state.playing ?
							<img src="./assets/images/media-pause-outline.svg" className="pause" alt="pause" title="Pause" /> :
							<img src="./assets/images/media-play-outline.svg" className="play" alt="play" title="play" />
					}

				</div>
				<label htmlFor="voices">Select voice:</label>
				<select id="voices" />
				<label htmlFor="pitch">Pitch:</label>
				<input type="number" min="-1" max="1" value="0" step="0.25" />
			</div>
		)
	}
}
