import { SerialPort, ReadlineParser } from 'serialport'
import express, { Request, Response } from 'express';
import WSServer from "./WSServer";
import GameEngine, { Operator } from './service/GameEngine';

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (_, res) => {
  res.send(JSON.stringify(gameEngine.getCurrentState()));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});




const server = new WSServer();
const gameEngine = new GameEngine(server.sendMessage);


const serialport = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 115200})
var counter = 0;

const parser = serialport.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', (data: string) => {
    console.log(data)
    if(data == "1") gameEngine.updateAmplitude(Operator.INC);
    if(data == "-1") gameEngine.updateAmplitude(Operator.DEC);
});


const onClose = () => {
    serialport.flush(() => serialport.close())
    
}

process.on("exit", onClose)

