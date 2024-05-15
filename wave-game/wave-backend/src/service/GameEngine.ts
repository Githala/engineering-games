import ComplexWave from "../models/ComplexWave";
import SineWave from "../models/SineWave";
import WaveGenerator from "../service/WaveGenerator"

export default class GameEngine {

    private waveGenerator: WaveGenerator = new WaveGenerator();
    private targetWave: ComplexWave;
    private currentWave: ComplexWave;
    private currentSineWave: SineWave;

    private updateCallback: (message: ComplexWave) => void

    constructor(updateCallback: (message: ComplexWave) => void) {
        this.targetWave = this.waveGenerator.randomWave();
        this.currentWave =  { sineWaves: [
            {amplitude: 1, frequency: 1, phaseShift: 1}
        ] }
        this.currentSineWave = this.currentWave.sineWaves[0];
        this.updateCallback = updateCallback;
    }

    updateAmplitude(operator: Operator) {
        switch(operator) {
            case Operator.INC: this.currentSineWave.amplitude++; break;
            case Operator.DEC: this.currentSineWave.amplitude--; break;
        }
        this.updateCallback(this.currentWave);
    }

    getCurrentState() {
        return {currentWave: this.currentWave, targetWave: this.targetWave};
    }


    private getNextSineWave() {

    }

    private getPrevSineWave() {
        
    }
}

export enum Operator {
    INC,
    DEC
}