import WebSocket from 'ws';

export default class WSServer {
    private wss;
    private clients: WebSocket[]

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

    sendMessage = (message: any) => {
        this.clients.forEach(client => {
            client.send(JSON.stringify(message));
        });
    }

    private handleMessageReceived(message: string, ws: WebSocket) {
        console.log(`Received message: ${message}`);
        ws.send(`Server received your message: ${message}`);
    }

    private close(ws: WebSocket) {
        console.log('Client disconnected');
        const index = this.clients.indexOf(ws);
        this.clients.splice(index, 1);
    }
}