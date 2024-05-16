import GameEngine from '../service/GameEngine';
import { Operator } from "./Operator";

export default interface InputOperator {
	inputNumer: number;
    operator: Operator;
}

export function parseInputData(inputData: string): InputOperator {
    const split = inputData.split(":");
    const inputNumber = parseInt(split[0]);
    const operator = split[1] == "1" ? Operator.INC :
                     split[1] == "-1" ? Operator.DEC : undefined;


    if (inputNumber !== undefined && operator !== undefined) {
        return {inputNumer: inputNumber, operator: operator!}
    } else {
        throw new Error("cannot parse input");
    }
} 