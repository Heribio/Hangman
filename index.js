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
    const roleColor = data.roles[0]; // Assuming there's only one role
    authorDiv.style.color = `rgb(${roleColor.colorR}, ${roleColor.colorG}, ${roleColor.colorB})`;

    const contentDiv = document.createElement('div');
    contentDiv.textContent = data.content;
    contentDiv.className = 'chat-message-content';

    // Insert the message div at the beginning of chat-box-content
    chatContainer.insertBefore(messageDiv, chatContainer.firstChild);
    messageDiv.appendChild(authorDiv);
    messageDiv.appendChild(contentDiv);
    
    const maxMessages = 20;
    
    // Remove excess messages if the queue exceeds maxMessages
    if (chatContainer.children.length > maxMessages) {
        for (let i = maxMessages; i < chatContainer.children.length; i++) {
            chatContainer.removeChild(chatContainer.children[i]);
        }
    }
});
