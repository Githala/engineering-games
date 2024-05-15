import ComplexWave from '../models/ComplexWave';
import SineWave from '../models/SineWave';

export default class WaveGenerator {

	randomWave(): ComplexWave {
		let nrOfWaves = this.getRandomInt(1, 3);
		return { sineWaves: [...Array(nrOfWaves)].map(() => this.getRandomSineWave()) };
	}

    private getRandomSineWave() {
        let amplitude = this.getRandomInt(1, 5);
        let frequency = this.getRandomInt(1, 10);
        let phase = this.getRandomInt(1, 4);
        return {amplitude: amplitude, frequency: frequency, phaseShift: phase};
    }
    
    private getRandomInt(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

