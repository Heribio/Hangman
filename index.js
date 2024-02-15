const socket = io.connect("http://localhost:6969/twitch");

socket.on("connect", () => {
    console.log("Connected to server via WebSocket");
    ask_word();
    let hangmanBox = document.getElementById("lives");
    hangmanBox.innerHTML = '<img src="./assets/Hangman_6.png" alt="hangman" width="200" height="200">'
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
    const wrongContainer = document.getElementById("wrong-letters")


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
   wrongContainer.innerHTML = "";
   let lives = 6
   globalThis.lives = lives;
   let hangmanBox = document.getElementById("lives");
   }

let found_letters = 0;

function hangman(lives) {
    let hangmanBox = document.getElementById("lives");

    if (lives == 0) {
        hangmanBox.innerHTML = '<img src="./assets/Hangman_0.png" alt="hangman" width="200" height="400">'
    }
    if (lives == 1) {
        hangmanBox.innerHTML = '<img src="./assets/Hangman_1.png" alt="hangman" width="200" height="400">'
    }
    if (lives == 2) {
        hangmanBox.innerHTML = '<img src="./assets/Hangman_2.png" alt="hangman" width="200" height="400">'
    }
    if (lives == 3) {
        hangmanBox.innerHTML = '<img src="./assets/Hangman_3.png" alt="hangman" width="200" height="400">'
    }
    if (lives == 4) {
        hangmanBox.innerHTML = '<img src="./assets/Hangman_4.png" alt="hangman" width="200" height="400">'
    }
    if (lives == 5) {
        hangmanBox.innerHTML = '<img src="./assets/Hangman_5.png" alt="hangman" width="200" height="400">'
    }
    if (lives == 6) {
        hangmanBox.innerHTML = '<img src="./assets/Hangman_6.png" alt="hangman" width="200" height="400">'
    }
} 

function letter_input(data) {
    let boxes = document.getElementsByClassName("letter-box");
    let is_right_letter = "";
    //Find if letter is in the word
    for (let i = 0; i < boxes.length; i++) {
        if (data == boxes[i].id) {
            if (boxes[i].textContent == data) {
                console.log('same letter: ' + data)
            }
            else {
                boxes[i].textContent = data;
                is_right_letter = true;
                found_letters++;
            }
        }
        if (found_letters == boxes.length) {
            gameWon()
            console.log("game won")
            return
        }
    }
    // If letter is not in the word, display it in the wrong letters box
    if (is_right_letter == false) {
        let wrong_letters_box = document.getElementById("wrong-letters");
        wrong_letters_box.textContent =
        wrong_letters_box.textContent + data + " ";
        lives--;
        hangman(lives)
            // If no lifes left, stop game
            if (lives == 0) {
                console.log("no lives left")
                for (let i = 0; i < boxes.length; i++) {
                    letter = boxes[i].id
                    boxes[i].textContent = letter;
                }
                gameover()
                return
            }
            //Show new life counter
            else {
                hangman(lives)
                console.log("lives left: " + lives)
            }
    }
    console.log("found letters: " + found_letters)
}

function ask_word() {
        socket.emit("request_word");
        console.log("Sent request for word");
}

function ask_current_word() {
    socket.emit("request_current_word");
    console.log("Sent request for current word");
}

//TODO
async function gameover() {
    console.log("game over function")
    let hangmanBox = document.getElementById("lives");

    // ask_current_word();
    hangmanBox.textContent = "Game Over";
    await new Promise(r => setTimeout(r, 4000));
    hangmanBox.textContent = "";
    ask_word();
    found_letters = 0;
}

async function gameWon() {
    console.log("game won function")
    let hangmanBox = document.getElementById("lives");
    hangmanBox.textContent = "You Win!";
    await new Promise(r => setTimeout(r, 2000));
    hangmanBox.textContent = "";
    ask_word();
    found_letters = 0;
}

socket.on("letter", (data) => {
    letter_input(data);
});

socket.on("word", (data) => {
    new_word(data);
});
