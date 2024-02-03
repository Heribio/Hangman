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
    const roleColor = data.roles[0]; //  Assuming there's only one role
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

function new_word(data) {
    console.log(data);
    // Assuming you have a container for the letter boxes
    const letterContainer = document.getElementById('word-display');
    
    // Clear the previous content
    letterContainer.innerHTML = '';

    const word = data["word"];
    
    // Create a letter box for each letter in the word
    for (let i = 0; i < word.length; i++) {
        const letterBox = document.createElement('div');
        letterBox.className = 'letter-box';
        letterContainer.appendChild(letterBox);
    }
}

// Function to get the current word from the word-display container
function getCurrentWord() {
    const letterContainers = getLetterContainers();
    let currentWord = '';

    for (let i = 0; i < letterContainers.length; i++) {
        const letterBox = letterContainers[i];
        currentWord += letterBox.textContent || '_'; // Use '_' for empty letter boxes
    }

    return currentWord;
}

// Function to get an array of letter containers
function getLetterContainers() {
    const letterContainer = document.getElementById('word-display');
    return Array.from(letterContainer.getElementsByClassName('letter-box'));
}

function showLetter(letter) {
    // Assuming you have a function to get the current word
    const currentWord = getCurrentWord(); // Implement this function accordingly
    
    // Assuming you have a function to get the letter containers
    const letterContainers = getLetterContainers(); // Implement this function accordingly
    
    // Find the first empty letter box and update its content
    for (let i = 0; i < letterContainers.length; i++) {
        const letterBox = letterContainers[i];

        // Check if the letter is part of the word and the box is empty
        if (currentWord.includes(letter) && letterBox.textContent === '') {
            letterBox.textContent = letter;

            // Assuming you have a function to mark the letter as filled
            markLetterAsFilled(letter); // Implement this function accordingly
            break;
        }
    }
}


socket.on('letter', (data) => {
    showLetter(data);
});

socket.on('word', (data) => {
    new_word(data)
});