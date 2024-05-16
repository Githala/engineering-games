import { SerialPort, ReadlineParser } from 'serialport'
import express, { Request, Response } from 'express';
import WSServer from "./WSServer";
import GameEngine from './service/GameEngine';
import { Operator } from "./models/Operator";
import { parseInputData } from './models/InputOperation';

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

SerialPort.list().then((ports) => {
  const serialInput = ports.find(p => p.vendorId === "10c4" && p.productId === "ea60")?.path
  if (serialInput!==undefined) attachSerialInput(serialInput!)
})

function attachSerialInput(serialInput: string) {
  const serialport = new SerialPort({ path: serialInput, baudRate: 115200})

  const parser = serialport.pipe(new ReadlineParser({ delimiter: '\r\n' }))
  parser.on('data', (data: string) => {
      console.log(data)
      if(/^[0-9]:-?1/.test(data)) {
        const InputOperation = parseInputData(data);
        gameEngine.updateAmplitude(InputOperation);
      }
  });
  
  const onClose = () => {
      serialport.flush(() => serialport.close())      
  }
  
  process.on("exit", onClose)
}
