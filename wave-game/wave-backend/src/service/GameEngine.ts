import ComplexWave from "../models/ComplexWave";
import InputOperation from "../models/InputOperation";
import WaveGenerator from "../service/WaveGenerator"
import { Operator } from "../models/Operator";

type GameState = {currentWave: ComplexWave, targetWave: ComplexWave, currentSineWaveIndex: number, solved: boolean}

export default class GameEngine {

    private waveGenerator: WaveGenerator = new WaveGenerator();
    private gameState: GameState;
    private callbacks: ((message: GameState) => void)[] = [];
    // private solvedCallbacks: (() => void)[] = [];
    // private newGameCallbacks: (() => void)[] = [];

    constructor() {
        this.gameState = this.newGameState()
    }

    private newGameState() {
        return {
            targetWave: this.waveGenerator.randomWave(1, 2),
            currentWave: new ComplexWave([
                {amplitude: 1, frequency: 1, phaseShift: 0},
                {amplitude: 0, frequency: 1, phaseShift: 0},
            ]),
            currentSineWaveIndex: 0,
            solved: false
        };
    }

    addUpdateCallback(cb: (message: GameState) => void) {
        this.callbacks.push(cb);
    }

    updateWave(inputOperation: InputOperation) {
        if (this.gameState.solved) return;

        const currentSineWave = this.gameState.currentWave.get(this.gameState.currentSineWaveIndex);
        
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
        
        if(this.validate(this.gameState.currentWave, this.gameState.targetWave)) {
            this.setSolved();
        }
        this.callCallbacks();
    }

    nextWave() {
        this.gameState.currentSineWaveIndex = (this.gameState.currentSineWaveIndex+1) % this.gameState.currentWave.length();
    }

    prevWave() {
        this.gameState.currentSineWaveIndex = (this.gameState.currentSineWaveIndex-1) % this.gameState.currentWave.length();
    }

    setWave(i: number) {
        if (i < this.gameState.currentWave.length() && i >= 0) {
            this.gameState.currentSineWaveIndex = i;
        }
        this.callCallbacks();
    }

    newGame() {
        this.gameState = this.newGameState();
        this.callCallbacks();
    }

    resetWave() {
        this.gameState.currentWave = new ComplexWave([
            {amplitude: 1, frequency: 1, phaseShift: 0},
            {amplitude: 0, frequency: 1, phaseShift: 0},
            {amplitude: 0, frequency: 1, phaseShift: 0}
        ]);
    }

    getCurrentState() {
        return this.gameState;
    }

    private validate(currentWave: ComplexWave, targetWave: ComplexWave) {
        for(let x=0; x<100; x++){
            let currentYs = currentWave.waves().map((func) => func.amplitude*Math.sin(func.frequency*x+(func.phaseShift*Math.PI/2)));
            let currentY = currentYs.reduce((a,b) => a+b);

            let targetYs = targetWave.waves().map((func) => func.amplitude*Math.sin(func.frequency*x+(func.phaseShift*Math.PI/2)));
            let targetY = targetYs.reduce((a,b) => a+b);
            if (Math.abs(currentY - targetY) > 0.00001) {
                return false;
            }
        }
        return true;
    }

    private callCallbacks() {
        this.callbacks.forEach(cb => cb(this.gameState));
    }

    private setSolved() {
        this.gameState.solved = true;
        this.callCallbacks();
    }
}

