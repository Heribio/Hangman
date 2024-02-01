const socket = io.connect('http://localhost:6969/twitch');

socket.on('connect', () => {
    console.log('Connected to server via WebSocket');
});

socket.on('chat_message', (data) => {
    const chatContainer = document.getElementById('chat-box-content');

    // Create message div elements (similar to your existing code)
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';

    const authorDiv = document.createElement('div');
    authorDiv.className = 'chat-message-username';
    authorDiv.textContent = data.displayName;

    const contentDiv = document.createElement('div');
    contentDiv.textContent = data.content;
    contentDiv.className = 'chat-message-content';

    // Insert the message div at the beginning of chat-box-content
    chatContainer.insertBefore(messageDiv, chatContainer.firstChild);
    messageDiv.appendChild(authorDiv);
    messageDiv.appendChild(contentDiv);

    // Remove excess messages if the queue exceeds maxMessages
    if (chatContainer.children.length > maxMessages) {
        for (let i = maxMessages; i < chatContainer.children.length; i++) {
            chatContainer.removeChild(chatContainer.children[i]);
        }
    }
});



// Called every time a message comes in
/*function onMessageHandler(userMessage, self) {
    if (self) {
        return; // Ignore messages from the bot
    }

    // Display word in the chat
    const chatContainer = document.getElementById('chat-box-content');
    chatContainer.textContent = userMessage + '\n' + chatContainer.textContent;

    // If the command is known, let's execute it
    if (userMessage.length === 1 && isNaN(userMessage)) {
        const wordContainer = document.getElementById('word-display');
        const word = wordContainer.textContent;

        //Check if the letter is included in the word
        if (word.includes(userMessage)) {
            console.log(`* User sent a valid letter: ${userMessage}`);
            // Your response logic here
            // For example, you can send a message back to the channel
            // client.say(target, `You sent a valid letter: ${userMessage}`);
        } else {
            console.log(`* Letter is not in the word: ${userMessage}`);
        }
    }
}*/

const maxMessages = 20;

// Fetch messages from the server
/*fetch('http://127.0.0.1:6969/twitch')
    .then(response => response.json())
    .then(data => {
        console.log("Connected to twitch route:", data);
        const chatContainer = document.getElementById('chat-box-content');

        // Check if the returned data has 'chat_messages' property
        if (data.hasOwnProperty('chat_messages')) {
            const messages = data.chat_messages;

            // Iterate through messages and update chat-box-content
            messages.slice(0, maxMessages).forEach(message => {
                //create a div with a username class
                const messageDiv = document.createElement('div');
                messageDiv.className = 'chat-message';

                const authorDiv = document.createElement('div');
                authorDiv.className = 'chat-message-username';
                authorDiv.textContent = message.displayName;

                const contentDiv = document.createElement('div');
                contentDiv.textContent = message.content;
                contentDiv.className = 'chat-message-content';

                // Insert the message div at the beginning of chat-box-content
                chatContainer.insertBefore(messageDiv, chatContainer.firstChild);
                messageDiv.appendChild(authorDiv);
                messageDiv.appendChild(contentDiv);
            });

            // Remove excess messages if the queue exceeds maxMessages
            if (chatContainer.children.length > maxMessages) {
                for (let i = maxMessages; i < chatContainer.children.length; i++) {
                    chatContainer.removeChild(chatContainer.children[i]);
                }
            }
        } else {
            console.error('Invalid data format received from the server.');
        }
    })
    .catch(error => console.error('Error fetching messages:', error));*/