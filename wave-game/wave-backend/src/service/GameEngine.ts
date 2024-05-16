import ComplexWave from "../models/ComplexWave";
import InputOperation from "../models/InputOperation";
import SineWave from "../models/SineWave";
import WaveGenerator from "../service/WaveGenerator"
import { Operator } from "../models/Operator";

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

    updateAmplitude(inputOperation: InputOperation) {
        
        if(inputOperation.inputNumer === 1) {
            switch(inputOperation.operator) {
                case Operator.INC: this.currentSineWave.amplitude++; break;
                case Operator.DEC: this.currentSineWave.amplitude--; break;
            }
        }
        if(inputOperation.inputNumer === 2) {
            switch(inputOperation.operator) {
                case Operator.INC: this.currentSineWave.frequency++; break;
                case Operator.DEC: this.currentSineWave.frequency--; break;
            }
        }
        if(inputOperation.inputNumer === 3) {
            switch(inputOperation.operator) {
                case Operator.INC: this.currentSineWave.phaseShift++; break;
                case Operator.DEC: this.currentSineWave.phaseShift--; break;
            }
        }
        
        this.updateCallback(this.currentWave);
    }

    getCurrentState() {
        return {currentWave: this.currentWave, targetWave: this.targetWave};
    }
}

