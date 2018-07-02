/* eslint-disable max-len, jsx-a11y/no-static-element-interactions, class-methods-use-this, jsx-a11y/media-has-caption */
import React, { Component } from 'react'
// import fs from 'fs'
// import path from 'path'
import player from '../js/player.js'

export default class Controllers extends Component {
  constructor() {
    super()
    this.state = {
      playing: false,
      voices: null,
      volume: 0.5,
      speed: 1,
      pitch: 1,
      text: '',
      voice: null,
      language: null,

    }
    this.handleControllerClicks = this.handleControllerClicks.bind(this)
    this.onSliderChange = this.onSliderChange.bind(this)
    // this.textElem = document.querySelector('textarea');
  }

  componentDidMount() {
    player()
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
      .catch(err => console.log(err))
  }

  onSliderChange(e) {
    const slider = e.target.name
    const value = e.target.value
    this.setState({
      [slider]: value,
    })
    // console.log(value)
  }

  handleControllerClicks() {
    this.setState({
      playing: !this.state.playing,
    })
    // const text = document.querySelector('textarea').value
    // console.log(e.target, text)
  }

  render() {
    return (
      <div>

        <div id="player">
          <div id="soundbox" />
          <canvas id="cnvs" />
        </div>


        <fieldset>
          <legend>Audio settings</legend>

          <label htmlFor="voices">Select voice:</label>
          <select
            id="voices"
            name="voices"
          />
          <label htmlFor="volume">Volume: {this.state.volume}</label>
          <input
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="1"
            step="0.1"
            defaultValue="0.5"
            list="tickmarksVolume"
            onChange={this.onSliderChange}
          />

          <label htmlFor="speed">Speed: {this.state.speed}</label>
          <input
            type="range"
            id="speed"
            name="speed"
            min="0.5"
            max="2"
            defaultValue="1"
            step="0.1"
            list="tickmarksSpeed"
            onChange={this.onSliderChange}

          />
          <label htmlFor="pitch">Pitch: {this.state.pitch}</label>
          <input
            type="range"
            id="pitch"
            name="pitch"
            min="0"
            max="2"
            step="0.1"
            defaultValue="1"
            list="tickmarksPitch"
            onChange={this.onSliderChange}
          />
          <datalist id="tickmarksVolume">
            <option value="0" />
            <option value="0.1" />
            <option value="0.2" />
            <option value="0.3" />
            <option value="0.4" />
            <option value="0.5" />
            <option value="0.6" />
            <option value="0.7" />
            <option value="0.8" />
            <option value="0.9" />
            <option value="1" />
          </datalist>
          <datalist id="tickmarksSpeed">
            <option value="0" />
            <option value="1" />
            <option value="2" />
            <option value="3" />
            <option value="4" />
            <option value="5" />
            <option value="6" />
            <option value="7" />
            <option value="8" />
            <option value="9" />
            <option value="10" />
          </datalist>
          <datalist id="tickmarksPitch">
            <option value="0" />
            <option value="0.2" />
            <option value="0.4" />
            <option value="0.6" />
            <option value="0.8" />
            <option value="1" />
            <option value="1.2" />
            <option value="1.4" />
            <option value="1.6" />
            <option value="1.8" />
            <option value="2" />
          </datalist>

        </fieldset>


      </div>
    )
  }
}


// getGoogleAudio()
