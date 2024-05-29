import SineWave from "./SineWave";

export default class ComplexWave {
	private sineWaves: SineWave[];

	constructor(sineWaves: SineWave[]) {
		this.sineWaves = sineWaves;
	}

	get(i: number) {
		if (i >= 0 && i < this.sineWaves.length) {
			return this.sineWaves[i];
		} else {
			throw new Error("Index is out of bounds");
		}
	}

	waves() {
		return this.sineWaves;
	}

	length() {
		return this.sineWaves.length;
	}
}