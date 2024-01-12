// Called every time a message comes in
function onMessageHandler(target, userMessage, self) {
  if (self) {
    return; // Ignore messages from the bot
  }

  // Display word in the chat
  const chatContainer = document.getElementById('chat-box-content');
  chatContainer.textContent = chatContainer.textContent + userMessage + '\n';

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

    // Fetch messages from the backend and update chat-box-content
    fetch('http://localhost:5000/twitch')
      .then(console.log('Success!'))
      .then(response => response.json())
      .then(data => {
        // Update chat-box-content with received messages
        chatContainer.textContent = chatContainer.textContent + data.content + '\n';
        console.log(`* Received messages: ${data.content}`);
      })
      .catch(error => console.error('Error fetching messages:', error));
  } else {
    console.log(`* Ignoring message: ${userMessage}`);
  }
}
