
export function spliceAndDiceArray(textString) {
	const length = textString.length
	const slicedArr = []
	let start = 0
	const end = 5000
	while (length >= start) {
		slicedArr.push(textString.slice(start, start += end))
	}
	return slicedArr
}

export function makePromises(sliceyArr, voice) {
	const promises = []
	sliceyArr.forEach((text) => {
		const requestBody = {
			audioConfig: {
				audioEncoding: 'MP3',
				pitch: '0.00',
				speakingRate: '1.00',
			},
			input: {
				text,
			},
			voice: {
				languageCode: voice.slice(0, 5),
				name: voice,
				// ssmlGender: gender,
			},
		}

		const req = new Request(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?fields=audioContent&key=${process.env.G_API_KEY}`, {
			method: 'POST',
			body: JSON.stringify(requestBody),
		})

		const prom = new Promise((resolve) => {
			fetch(req)
				.then(resp => resp.json())
				.then((data) => {
					resolve(data)
				})
		})
		promises.push(prom)
	})
	return promises
}
