import React, { useState, useEffect } from 'react'
import Player from './Player'



const Fieldsets = () => {
  const [playing, setPlaying] = useState(false)
  const [voices, setVoices] = useState([])
  const [voice, setVoice] = useState(null)
  const [speed, setSpeed] = useState(1)
  const [text, setText] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const synthVoices = window.speechSynthesis.getVoices()
    if (!synthVoices.length) {
      console.log('voices error:', synthVoices)
      document.querySelector('.convert-info').textContent = `Error fetching voices`
      setError(synthVoices)
    } else {
      const sortedSynthVoices = synthVoices.sort((v1, v2) => {
        return v1.lang < v2.lang ? 1 : -1
      })
      console.log('voices found', synthVoices)
      setVoice(synthVoices.find(v => v.default === true))
      setVoices(sortedSynthVoices)
    }
  }, []);


  const onSliderChange = (e) => {
    const slider = e.target.name
    const value = e.target.value
    console.log({
      [slider]: value,
    })
    document.querySelector('audio').playbackRate = value
  }

  const onTextAreaChange = () => {
    setText(document.querySelector('textarea').value)
  }

  const playText = () => {
    setPlaying(true)
    console.log('play')

    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.voice = voice
    window.speechSynthesis.speak(msg);

    // Set the attributes.
    // msg.volume = parseFloat(volumeInput.value);
    // msg.rate = parseFloat(rateInput.value);
    // msg.pitch = parseFloat(pitchInput.value);

    // If a voice has been selected, find the voice and set the
    // utterance instance's voice attribute.
  }

  const handleVoiceChange = (e) => {
    console.log('e:', e.target.value)
    setVoice(voices.find(voice => voice.name === e.target.value))
  }


  return (
    <div className="container">
      <Player onSliderChange={onSliderChange} speed={speed} />

      <fieldset className="settings">
        <legend>Audio settings</legend>
        <label htmlFor="voices">Select voice:</label>
        <select
          id="voices"
          name="voices"
          onChange={(e) => handleVoiceChange(e)}
          defaultValue={voice}
        >
          {
            voices.map((voice, i) => (
              <option
                key={i}
                value={voice.name}
                selected={voice.default ? true : false}
              >
                {voice.name}
              </option>
            )
            )
          }
        </select>
        <button className="buttons" onClick={playText}>play</button>
      </fieldset>

      <fieldset className="info">
        <legend>Info</legend>
        <span className="text-length">Current text character count: {text.length} </span>
        <p className="convert-info">
          Text over 5000 characters will be split up & converted in multiple requests, please be patient.<br />
        </p>
      </fieldset>
      <textarea
        placeholder="Paste your text here, select a voice and click convert"
        onChange={onTextAreaChange}
        value={error || text || ''}
      />

    </div>
  )
}

export default Fieldsets
