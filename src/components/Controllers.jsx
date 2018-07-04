/* eslint-disable max-len, jsx-a11y/no-static-element-interactions, class-methods-use-this, jsx-a11y/media-has-caption */
import React, { Component } from 'react'
import Player from './Player';
import getGoogleAudio from '../js/get-google-audio.js'

export default class Controllers extends Component {
  constructor() {
    super()
    this.state = {
      playing: false,
      voices: null,
      speed: 1,
      text: '',
      voice: null,
      language: null,
    }
    this.onSliderChange = this.onSliderChange.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
  }

  componentDidMount() {
    // player()
    const voicesEl = document.querySelector('#voices');
    fetch(`https://texttospeech.googleapis.com/v1beta1/voices?&key=${process.env.G_API_KEY}`)
      .then(resp => resp.json())
      .then((data) => {
        data.voices.forEach((voice) => {
          if (!voice.name.includes('Wavenet')) {
            const option = document.createElement('option')
            option.value = voice.name
            option.text = voice.name
            if (voice.name === 'en-US-Standard-D') {
              option.setAttribute('selected', 'selected')
              this.setState({
                voice: voice.name,
                language: voice.name.slice(0, 5),
              })
            }
            voicesEl.add(option)
          }
        })
      })
      .catch((err) => {
        document.querySelector('.convert-info').textContent = `Error fetching voices: ${err.message}`
        console.log(err)
      })
  }

  onSliderChange(e) {
    const slider = e.target.name
    const value = e.target.value
    this.setState({
      [slider]: value,
    })
    document.querySelector('audio').playbackRate = value
  }

  onTextAreaChange() {
    this.setState({
      text: document.querySelector('textarea').value,
    })
  }

  convertText() {
    getGoogleAudio()
  }

  render() {
    return (
      <div className="container">
        <Player onSliderChange={this.onSliderChange} speed={this.state.speed} />

        <fieldset className="settings">
          <legend>Audio settings</legend>

          <label htmlFor="voices">Select voice:</label>
          <select
            id="voices"
            name="voices"
          />
          <label htmlFor="gender">Select gender:</label>
          <select
            id="gender"
            name="gender"
            defaultValue="Female"
          >
            <option>Female</option>
            <option>Male</option>
          </select>

          <button className="buttons" onClick={this.convertText}>Convert</button>

        </fieldset>

        <fieldset className="info">
          <legend>Info</legend>
          <span className="text-length">Current text character count: {this.state.text.length} </span>
          <p className="convert-info">
          Text over 5000 characters will be split up & converted in multiple requests, please be patient.<br />
          </p>
        </fieldset>
        <textarea placeholder="Paste your text here & press convert" onChange={this.onTextAreaChange} />

      </div>
    )
  }
}
