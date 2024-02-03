const socket = io.connect("http://localhost:6969/twitch");

socket.on("connect", () => {
    console.log("Connected to server via WebSocket");
});

socket.on("chat_message", (data) => {
    const chatContainer = document.getElementById("chat-box-content");

    // Create message div elements (similar to your existing code)
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message";

    const authorDiv = document.createElement("div");
    authorDiv.className = "chat-message-username";
    authorDiv.textContent = data.displayName;
    const roleColor = data.roles[0]; //  Assuming there's only one role
    authorDiv.style.color = `rgb(${roleColor.colorR}, ${roleColor.colorG}, ${roleColor.colorB})`;

    const contentDiv = document.createElement("div");
    contentDiv.textContent = data.content;
    contentDiv.className = "chat-message-content";

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
    const letterContainer = document.getElementById("word-display");

    // Clear the previous content
    letterContainer.innerHTML = "";

    const word = data["word"];

    // Create a letter box for each letter in the word
    for (let i = 0; i < word.length; i++) {
        const letterBox = document.createElement("div");
        letterBox.className = "letter-box";
        letterBox.id = word[i];
        letterContainer.appendChild(letterBox);
    }
}

function letter_input(data) {
    let boxes = document.getElementsByClassName("letter-box");
    for (let i = 0; i < boxes.length; i++) {
        //For each box
        if (data == boxes[i].id) {
            //If the letter is in the word
            boxes[i].textContent = data;
            return;
        }
    }
    let wrong_letters_box = document.getElementById("wrong-letters");
    wrong_letters_box.textContent =
    wrong_letters_box.textContent + data + "";
}

socket.on("letter", (data) => {
    letter_input(data);
});

socket.on("word", (data) => {
    new_word(data);
});
