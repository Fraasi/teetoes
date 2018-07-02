import fs from 'fs'
import path from 'path'

export default function getGoogleAudio() {
  const requestBody = {
    audioConfig: {
      audioEncoding: 'MP3',
      pitch: '0.00',
      speakingRate: '1.00',
    },
    input: {
      text: 'Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 32 voices, available in multiple languages and variants. And some other shit',
    },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Wavenet-D',
      ssmlGender: 'FEMALE',
    },
  }
  const req = new Request(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?fields=audioContent&key=${process.env.G_API_KEY}`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  })

  fetch(req)
    .then(resp => resp.json())
    .then((data) => {
      console.log('audio', data)
      const binary = Buffer.from(data.audioContent, 'base64')
      fs.writeFile('src/teetoes.mp3', binary, 'binary', (err) => {
        if (err) console.error('ERROR:', err)
        console.log('mp3 written to disk')
        const audio = document.querySelector('audio')
        const audioPath = path.join(__dirname, '../teetoes.mp3')
        audio.src = audioPath
        // console.log(dir)
      })
    })
}
