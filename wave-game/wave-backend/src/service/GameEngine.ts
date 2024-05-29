import ComplexWave from "../models/ComplexWave";
import InputOperation from "../models/InputOperation";
import WaveGenerator from "../service/WaveGenerator"
import { Operator } from "../models/Operator";

export default class GameEngine {

    private waveGenerator: WaveGenerator = new WaveGenerator();
    private targetWave: ComplexWave;
    private currentWave: ComplexWave;
    private currentSineWaveIndex: number;
    private solved: boolean;

    private updateCallback: (message: {currentWave: ComplexWave, currentSineWaveIndex: number}) => void

    constructor(updateCallback: (message: {currentWave: ComplexWave, currentSineWaveIndex: number}) => void) {
        this.targetWave = this.waveGenerator.randomWave();
        this.currentWave =  new ComplexWave([
            {amplitude: 1, frequency: 1, phaseShift: 0},
            {amplitude: 0, frequency: 1, phaseShift: 0},
            {amplitude: 0, frequency: 1, phaseShift: 0}
        ]);
        this.currentSineWaveIndex = 0;
        this.updateCallback = updateCallback;
        this.solved = false;
    }

    updateWave(inputOperation: InputOperation) {
        if (this.solved) return;

        const currentSineWave = this.currentWave.get(this.currentSineWaveIndex);
        
        if(inputOperation.inputNumer === 0) {
            switch(inputOperation.operator) {
                case Operator.INC: currentSineWave.amplitude++; break;
                case Operator.DEC: currentSineWave.amplitude--; break;
            }
            if(currentSineWave.amplitude < 0) currentSineWave.amplitude = 0;
        }
        if(inputOperation.inputNumer === 1) {
            switch(inputOperation.operator) {
                case Operator.INC: currentSineWave.frequency++; break;
                case Operator.DEC: currentSineWave.frequency--; break;
            }
            if(currentSineWave.frequency < 1) currentSineWave.frequency = 1;
        }
        if(inputOperation.inputNumer === 2) {
            switch(inputOperation.operator) {
                case Operator.INC: currentSineWave.phaseShift++; break;
                case Operator.DEC: currentSineWave.phaseShift--; break;
            }
            currentSineWave.phaseShift%=4;
            if (currentSineWave.phaseShift < 0) currentSineWave.phaseShift = 3;
        }
        
        this.solved = this.validate(this.currentWave, this.targetWave);
        this.updateCallback({currentWave: this.currentWave, currentSineWaveIndex: this.currentSineWaveIndex});
    }

    nextWave() {
        this.currentSineWaveIndex = (this.currentSineWaveIndex+1) % this.currentWave.length();
    }

    prevWave() {
        this.currentSineWaveIndex = (this.currentSineWaveIndex-1) % this.currentWave.length();
    }

    newTargetWave() {
        this.targetWave = this.waveGenerator.randomWave();
    }

    resetWave() {
        this.currentWave = new ComplexWave([
            {amplitude: 1, frequency: 1, phaseShift: 0},
            {amplitude: 0, frequency: 1, phaseShift: 0},
            {amplitude: 0, frequency: 1, phaseShift: 0}
        ]);
    }

    getCurrentState() {
        return {currentWave: this.currentWave, targetWave: this.targetWave, currentSineWaveIndex: this.currentSineWaveIndex};
    }

    private validate(currentWave: ComplexWave, targetWave: ComplexWave) {
        for(let x=0; x<100; x++){
            let currentYs = currentWave.waves().map((func) => func.amplitude*Math.sin(func.frequency*x+(func.phaseShift*Math.PI/2)));
            let currentY = currentYs.reduce((a,b) => a+b);

            let targetYs = targetWave.waves().map((func) => func.amplitude*Math.sin(func.frequency*x+(func.phaseShift*Math.PI/2)));
            let targetY = targetYs.reduce((a,b) => a+b);
            if (currentY !== targetY) {
                return false;
            }
        }
        return true;
    }
}

