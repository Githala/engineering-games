import ComplexWave from '../models/ComplexWave';

export default class WaveGenerator {

	randomWave(min: number, max: number): ComplexWave {
		let nrOfWaves = this.getRandomInt(min, max);
		return new ComplexWave([...Array(nrOfWaves)].map(() => this.getRandomSineWave()));
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

