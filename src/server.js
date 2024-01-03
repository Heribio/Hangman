// server.js

const tmi = require('tmi.js');
const WebSocket = require('ws'); // You may need to install the 'ws' package

const opts = {
  identity: {
    username: 'BotHeri',
    password: '454os7dkrzcyfccuzbmn1a7aq4j80l'
  },
  channels: ['Heribio']
};

const client = new tmi.client(opts);
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 }); // Adjust the port as needed

function onMessageHandler(target, context, msg, self) {
  if (self) {
    return; // Ignore messages from the bot
  }

  const userMessage = msg.trim();

  if (userMessage.length === 1 && isNaN(userMessage)) {
    // Emit an event or send a message to the client-side (browser)
    // to handle this message (e.g., update the displayed word)
    wss.clients.forEach(client => {
      client.send(JSON.stringify({ type: 'updateWord', message: userMessage }));
    });
  } else {
    console.log(`* Ignoring message: ${userMessage}`);
  }
}

function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
