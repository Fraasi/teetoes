import React, { Component } from 'react'
import Player from './Player'
import getGoogleAudio from '../js/get-google-audio.js'

const { remote } = require('electron')

const { Menu, MenuItem } = remote
const menu = new Menu()
menu.append(new MenuItem({ role: 'cut', accelerator: 'CmdOrCtrl+X' }))
menu.append(new MenuItem({ role: 'copy', accelerator: 'CmdOrCtrl+C' }))
menu.append(new MenuItem({ role: 'paste', accelerator: 'CmdOrCtrl+V' }))
menu.append(new MenuItem({ role: 'selectAll', accelerator: 'CmdOrCtrl+A' }))

export default class Controllers extends Component {
  constructor() {
    super()
    this.state = {
      playing: false,
      voices: null,
      voice: null,
      speed: 1,
      text: '',
    }
    this.genderLetters = ['A', 'B', 'C', 'D', 'E', 'F'] // even = females, odd =  males
    this.onSliderChange = this.onSliderChange.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.sortVoices = this.sortVoices.bind(this)
  }

  componentDidMount() {
    document.querySelector('textArea').addEventListener('contextmenu', (e) => {
      e.preventDefault()
      menu.popup({ window: remote.getCurrentWindow() })
    }, false)
    fetch(`https://texttospeech.googleapis.com/v1beta1/voices?&key=${process.env.G_API_KEY}`)
      .then(resp => resp.json())
      .then((data) => {
        this.setState({
          voices: data,
        }, function () {
          this.sortVoices()
        })
      })
      .catch((err) => {
        document.querySelector('.convert-info').textContent = `Error fetching voices: ${err.message}`
        console.log(err)
      })
  }

  sortVoices(e) {
    // e.persist()
    const selectedVoice = e ? e.target.defaultValue : 'Standard'
    console.log('selectedVoice', selectedVoice)
    const voicesEl = document.querySelector('#voices')
    voicesEl.innerHTML = ''
    this.state.voices.voices.forEach((voice) => {
      if (voice.name.includes(selectedVoice)) {
        const option = document.createElement('option')
        option.value = voice.name
        option.text = voice.name + this.getGender(voice.name.slice(-1))
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
    getGoogleAudio()
  }

  getGender(letter) {
    return this.genderLetters.indexOf(letter) % 2
      ? ' - Male'
      : ' - Female'
  }

  render() {
    return (
      <div className="container">
        <Player onSliderChange={this.onSliderChange} speed={this.state.speed} />

        <fieldset className="settings">
          <legend>Audio settings</legend>
          <input type="radio" id="standard" name="voice" value="Standard" defaultChecked onChange={this.sortVoices} />
          <label htmlFor="standard">Standard:</label>
          <input type="radio" id="wavenet" name="voice" value="Wavenet" onChange={this.sortVoices} />
          <label htmlFor="wavenet">Wavenet:</label>
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
        <textarea placeholder="Paste your text here, select a voice and click convert" onChange={this.onTextAreaChange} />

      </div>
    )
  }
}
