
export default function getGoogleAudio() {
	const gender = document.querySelector('#gender')
	const audio = document.querySelector('audio')
	const text = document.querySelector('textarea')
	const info = document.querySelector('.convert-info')
	const voices = document.querySelector('#voices')
	console.log(voices.value, gender.value)

	info.textContent = 'Sending request, converting...'
	audio.style.pointerEvents = 'none'

	const requestBody = {
		audioConfig: {
			audioEncoding: 'MP3',
			pitch: '0.00',
			speakingRate: '1.00',
		},
		input: {
			text: text.value,
		},
		voice: {
			languageCode: voices.value.slice(0, 5),
			name: voices.value,
			ssmlGender: gender.value,
		},
	}
	const req = new Request(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?fields=audioContent&key=${process.env.G_API_KEY}`, {
		method: 'POST',
		body: JSON.stringify(requestBody),
	})

	fetch(req)
		.then(resp => resp.json())
		.then((data) => {
			if (data.error) throw new Error(`Response error: ${data.error.message}`)
			const binary = Buffer.from(data.audioContent, 'base64')
			const blob = new Blob([binary], { type: 'audio/mp3' })
			const oUrl = URL.createObjectURL(blob)
			audio.src = oUrl
			audio.style.pointerEvents = ''
			info.textContent = `Text(${text.value.length} chars) converted, audio file ready!  `

			const a = document.createElement('a')
			a.href = oUrl
			a.download = 'teetoes.mp3'
			a.innerHTML = '<button class="buttons">Download</button>'
			info.appendChild(a)
			audio.onload = () => {
				URL.revokeObjectURL(oUrl)
			}
		})
		.catch((err) => {
			console.log(err.message)
			info.textContent = err.message
		})
}
