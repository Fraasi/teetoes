import React, { Component } from 'react'
import player from '../js/player.js'

export default class Player extends Component {
  componentDidMount() {
    player()
  }

  render() {
    return (
      <div id="player">
        <div id="soundbox" />
        <canvas id="cnvs" />
        <label htmlFor="speed">Playback Speed: {this.props.speed}</label>
        <input
          type="range"
          id="playback-speed"
          name="speed"
          min="0.5"
          max="2"
          defaultValue="1"
          step="0.1"
          list="tickmarksSpeed"
          onChange={this.props.onSliderChange}
        />
        <datalist id="tickmarksSpeed">
          <option value="0.5" />
          <option value="0.6" />
          <option value="0.7" />
          <option value="0.8" />
          <option value="0.9" />
          <option value="1" />
          <option value="1.1" />
          <option value="1.2" />
          <option value="1.3" />
          <option value="1.4" />
          <option value="1.5" />
          <option value="1.6" />
          <option value="1.7" />
          <option value="1.8" />
          <option value="1.9" />
          <option value="2" />
        </datalist>
      </div>
    )
  }
}
