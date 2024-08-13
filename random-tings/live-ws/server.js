const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Set();

wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.add(ws);

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });
});

const pollTask = () => {
    const message = { text: "hello i polled!" };
    console.log(`polled, notifying ${clients.size} people`)

    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
};

setInterval(pollTask, 5000);

console.log('running on ws://localhost:8080');


