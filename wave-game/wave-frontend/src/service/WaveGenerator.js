import SineWave from '@/models/SineWave.js';

export default class {

	randomWave() {
		let nrOfWaves = getRandomInt(3, 3);
		return [...Array(nrOfWaves)].map(() => getRandomSineWave())
	}
}

function getRandomSineWave() {
	let amplitude = getRandomInt(1, 5);
	let frequency = getRandomInt(1, 10);
	let phase = getRandomInt(1, 4);
	return new SineWave(amplitude, frequency, phase);
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}