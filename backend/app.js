const express = require("express");
const http = require("http");
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app)
const wss = new WebSocket.Server({ server });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

wss.on('connection', (ws) => {

    ws.on('message', (message) => {
        console.log("WS-Message", message)
        wss.clients.forEach(client => {
            if (client != ws) {
                client.send(message);
            }
        });
    });

});

app.get("/messages", function (request, response) {
    response.send(JSON.stringify(messages));
});

server.listen(process.env.PORT || 8000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});