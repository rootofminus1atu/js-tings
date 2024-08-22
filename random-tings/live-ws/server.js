const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map()

wss.on('connection', (ws) => {
    console.log('New client connected');

    const clientInfo = { 
        ws: ws,
        notifyEvenMinutes: true,
        notifyOddMinutes: true
    }

    clients.set(ws, clientInfo);

    ws.on('message', (message) => {
        try {
            console.log(message)
            const data = JSON.parse(message.toString());
            if (data.type === 'preferences') {
                clientInfo.notifyEvenMinutes = data.notifyEvenMinutes;
                clientInfo.notifyOddMinutes = data.notifyOddMinutes;
                console.log('Updated client preferences:', clientInfo);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    })

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });
});

const pollTask = () => {
    const currentMinutes = new Date().getMinutes();
    const isEvenMinute = currentMinutes % 2 === 0;
    const message = {
        text: isEvenMinute ? "It's an even minute!" : "It's an odd minute!",
        even: isEvenMinute
    };    
    console.log(`polled, ${clients.size} people, even minute: ${isEvenMinute}`)

    clients.forEach((clientInfo) => {
        const { ws, notifyEvenMinutes, notifyOddMinutes } = clientInfo;

        if (ws.readyState === WebSocket.OPEN) {
            if ((isEvenMinute && notifyEvenMinutes) || (!isEvenMinute && notifyOddMinutes)) {
                console.log(`notifying with ${message}`)
                ws.send(JSON.stringify(message));
            }
        }
    });
};

setInterval(pollTask, 10000);

console.log('running on ws://localhost:8080');


