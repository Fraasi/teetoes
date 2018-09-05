/**
 * Slices text over 5000 & returns array
 * @param {string} text
 * @return {Array} Array of strings
 */
export function sliceAndDiceArray(text) {
	const length = text.length
	const slicedArr = []
	let start = 0
	const end = 5000
	while (length >= start) {
		slicedArr.push(text.slice(start, start += end))
	}
	return slicedArr
}

/**
 * Make request promises out of array of texts
 * @param {Array} slicedArr
 * @param {string} voice
 * @returns {Array} Array of promises
 */
export function makeRequestPromises(slicedArr, voice) {
	const promises = []
	slicedArr.forEach((text) => {
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
