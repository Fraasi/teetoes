import React, { Component } from 'react'
import Player from './Player'


export default class Fieldsets extends Component {
  constructor() {
    super()
    this.state = {
      playing: false,
      voices: [],
      voice: null,
      speed: 1,
      text: '',
      error: null,
    }
    // this.synth = window.speechSynthesis
    this.onSliderChange = this.onSliderChange.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.sortVoices = this.sortVoices.bind(this)
  }

  loadVoices() {
    // const voices = window.speechSynthesis.getVoices();
    const voicesEl = document.querySelector('#voices')
    const sortedVoices =
    this.state.voices.forEach((voice, i) => {
      const option = document.createElement('option')
      option.value = voice.name
      option.innerHTML = voice.name
      if (voice.default) option.setAttribute('selected', 'selected')
      voicesEl.appendChild(option)
    })
  }

  componentDidMount() {
    // document.querySelector('textArea').addEventListener('contextmenu', (e) => {
    // e.preventDefault()
    // menu.popup({ window: remote.getCurrentWindow() })
    // }, false)

    // this.loadVoices()
    const voices = window.speechSynthesis.getVoices()

    if (!voices.length) {
      console.log('voices error:', voices)
      document.querySelector('.convert-info').textContent = `Error fetching voices`
      this.setState({
        error: voices,
        voices: voices,

    }, function() { console.log(this.state.voices) })
    } else {
      console.log('voices found')
      this.setState({
        voices: voices,
      }, function () {
        // this.sortVoices()
        console.log(this.state.voices)
        this.loadVoices()
      })
    }
  }

  sortVoices(e) {
    const selectedVoice = e ? e.target.defaultValue : 'Standard'
    const voicesEl = document.querySelector('#voices')
    voicesEl.innerHTML = ''
    this.state.voices.voices.forEach((voice) => {
      if (voice.name.includes(selectedVoice)) {
        const option = document.createElement('option')
        option.value = voice.name
        option.text = `${voice.name}-${voice.ssmlGender.toLowerCase()}`
        if (voice.name === 'en-US-Standard-B') {
          option.setAttribute('selected', 'selected')
          this.setState({
            voice: voice.name,
          })
        } else if (voice.name === 'en-US-Wavenet-A') {
          option.setAttribute('selected', 'selected')
          this.setState({
            voice: voice.name,
          })
        }
        voicesEl.add(option)
      }
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
    // getGoogleAudio()
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
          <button className="buttons" onClick={this.convertText}>Convert</button>
        </fieldset>

        <fieldset className="info">
          <legend>Info</legend>
          <span className="text-length">Current text character count: {this.state.text.length} </span>
          <p className="convert-info">
            Text over 5000 characters will be split up & converted in multiple requests, please be patient.<br />
          </p>
        </fieldset>
        <textarea
          placeholder="Paste your text here, select a voice and click convert"
          onChange={this.onTextAreaChange}
          value={this.state.error || ''}
        />

      </div>
    )
  }
}
