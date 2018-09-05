import { sliceAndDiceArray, makeRequestPromises } from './array-methods'

export default function getGoogleAudio() {
	const audio = document.querySelector('audio')
	const text = document.querySelector('textarea')
	const info = document.querySelector('.convert-info')
	const voices = document.querySelector('#voices')
	console.log('voices.value', voices.value)
	const startTime = new Date()

	info.innerHTML = 'Sending request(s), converting<span class="jsloader"></span>'
	const loader = document.querySelector('.jsloader')
	const interval = setInterval(() => {
		if ((loader.innerHTML += '.').length === 4) {
			loader.innerHTML = ''
		}
	}, 500)
	audio.style.pointerEvents = 'none'

	const promises = makeRequestPromises(sliceAndDiceArray(text.value), voices.value)
	Promise.all(promises)
		.then((values) => {
			clearInterval(interval)
			let concatenatedResponse = ''
			values.forEach((data) => {
				if (data.error) throw new Error(`Response error: ${data.error.message}`)
				concatenatedResponse += data.audioContent
			})

			const binary = Buffer.from(concatenatedResponse, 'base64')
			const blob = new Blob([binary], { type: 'audio/mp3' })
			const oUrl = URL.createObjectURL(blob)
			audio.src = oUrl
			audio.style.pointerEvents = ''
			const endTime = new Date()
			const time = (endTime - startTime) / 1000
			info.innerHTML = `Text converted in ${values.length} part(s), in ${time.toFixed(3)} seconds.<br/>Audio file ready to play or  \u00A0`

			const a = document.createElement('a')
			a.href = oUrl
			a.download = `teetoes-${voices.value}.mp3`
			a.innerHTML = '<button class="buttons">Save to file</button>'
			info.appendChild(a)
			audio.onload = () => {
				URL.revokeObjectURL(oUrl)
			}
		})
		.catch((err) => {
			clearInterval(interval)
			console.log(err.message)
			info.textContent = err.message
		})
}
