const dotenv = require('dotenv');
dotenv.config();
const { Client, IntentsBitField, ActivityType, NewsChannel } = require("discord.js");
require("dotenv/config")
const fs = require('fs');
const axios = require('axios'); // Import the axios library

//Create a word and display it
function randomword() {
  fetch('https://api.api-ninjas.com/v1/randomword', {
      headers: {
          'X-Api-Key': "jPf+s0IH8KBzaoTat6APZA==De1VONvhfb5hnmzu"
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(word => {
    const wordContainer = document.getElementById('word-display');
    wordContainer.textContent = word.word;
    let word_length = word.word.length;
    console.log(word_length)
    for (let i = 0; i < word.word.length; i++) {
      const letterBox = document.createElement('div');
      letterBox.className = 'letter-box';
      wordContainer.appendChild(letterBox);
    }
  })
  .catch(error => {
      console.error('Fetch error:', error);
  });
}

const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'BotHeri',
    password: '454os7dkrzcyfccuzbmn1a7aq4j80l'
  },
  channels: [
    'Heribio'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) {
      return; // Ignore messages from the bot
    }
  
    // Remove whitespace from chat message
    const userMessage = msg.trim();
  
    // If the command is known, let's execute it
    if (userMessage.length === 1 && isNaN(userMessage)) {
      const wordContainer = document.getElementById('word-display');
      const word = wordContainer.textContent;
  
      // Check if the letter is included in the word
      if (word.includes(userMessage)) {
        console.log(`* User sent a valid letter: ${userMessage}`);
        // Your response logic here
        // For example, you can send a message back to the channel
        client.say(target, `You sent a valid letter: ${userMessage}`);
      } else {
        console.log(`* Letter is not in the word: ${userMessage}`);
      }
    } else {
      console.log(`* Ignoring message: ${userMessage}`);
    }
  }

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}