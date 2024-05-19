import WebSocket from 'ws';
import GameEngine from './service/GameEngine';

export default class WSServer {
    private wss;
    private clients: WebSocket[]
    private messageCallbacks: {(param:string): void;}[] = [];

    constructor() {
        this.wss = new WebSocket.Server({ port: 3001 });
        this.clients = [];

        this.wss.on('connection', (ws: WebSocket) => {
            console.log('New client connected');
            this.clients.push(ws);

            ws.on('message', (message: string) => this.handleMessageReceived(message, ws));
            ws.on('close', () => this.close(ws));
        });
    }

    addMessageCallback(callback: {(param:string): void}) {
        this.messageCallbacks.push(callback);
    }

    sendMessage = (message: any) => {
        this.clients.forEach(client => {
            client.send(JSON.stringify(message));
        });
    }

    private handleMessageReceived(message: string, ws: WebSocket) {
        console.log(message.toString());
        this.messageCallbacks.forEach(cb => cb(message.toString()));
    }

    private close(ws: WebSocket) {
        console.log('Client disconnected');
        const index = this.clients.indexOf(ws);
        this.clients.splice(index, 1);
    }
}