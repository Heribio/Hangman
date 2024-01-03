// client.js

const socket = new WebSocket('ws://localhost:8080'); // Adjust the URL to match your WebSocket server

socket.addEventListener('message', event => {
  const data = JSON.parse(event.data);

  if (data.type === 'updateWord') {
    // Handle the update of the displayed word in the DOM
    const wordContainer = document.getElementById('word-display');
    const word = wordContainer.textContent;

    // Check if the letter is included in the word
    if (word.includes(data.message)) {
      console.log(`* User sent a valid letter: ${data.message}`);
      // Your response logic here
      // For example, you can update the DOM, send a message back to the channel, etc.
      socket.send(`You sent a valid letter: ${data.message}`);
    } else {
      console.log(`* Letter is not in the word: ${data.message}`);
    }
  }
});

// Connect to Twitch chat
const client = new tmi.client(opts);
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();
