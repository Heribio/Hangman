const express = require("express");

const port = 5000;
const app = express();
app.use(express.json());

//Create a word and display it
function randomword() {
  fetch('https://api.api-ninjas.com/v1/randomword', {
      headers: {
          'X-Api-Key': ""
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

// Called every time a message comes in
function onMessageHandler(target, userMessage, self) {
    if (self) {
      return; // Ignore messages from the bot
    }
  
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

  app.post("/twitch", (req, res) => {
    const twitchMessage = req.body;
    console.log(twitchMessage);
  
    const userMessage = twitchMessage.content.trim();
  
    if (userMessage.length === 1 && isNaN(userMessage)) {
      // Emit an event or send a message to the client-side (browser)
      // to handle this message (e.g., update the displayed word)
      onMessageHandler(userMessage);
      res.sendStatus(200);
    } else {
      res.status(400).send("Invalid Twitch message format");
    }
  });
  
  app.listen(port, () => {
    console.log(`Discord bridge listening at http://localhost:${port}`);
  });
  
  function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
  }
  

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}