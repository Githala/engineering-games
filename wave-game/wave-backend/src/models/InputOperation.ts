import GameEngine from '../service/GameEngine';
import { Operator } from "./Operator";

export default interface InputOperator {
	inputNumer: number;
    operator: Operator;
}

export function parseRotInputData(inputData: string): InputOperator {
    const split = inputData.split(":");
    const inputNumber = parseInt(split[1]);
    const operator = split[2] == "1" ? Operator.INC :
                     split[2] == "-1" ? Operator.DEC : undefined;


    if (inputNumber !== undefined && operator !== undefined) {
        return {inputNumer: inputNumber, operator: operator!}
    } else {
        throw new Error("cannot parse input");
    }
}

export function parseWaveInputData(inputData: string) {
    const split = inputData.split(":");
    return parseInt(split[1]);
}