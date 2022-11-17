import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

function initBoard() {
    let board = document.getElementById('game-board');

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement('div');
        row.classList = "letter-row"

        for (let j = 0; j < 5; j++) {
            let box = document.createElement('div')
            box.className = 'letter-box'
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

initBoard()

document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
        return
    }
    let pressedKey = string(e.key)
    if (pressedKey === 'Backspace' && nextLetter !== 0) {
        deleteLetter()
        return
    }
    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

function insertLetter(pressedKey) {
    if (nextLetter === 5) {
        return
    }

    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add('filled-box')
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter() {
    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ''
    box.classList.remove('filled-box')
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess() {
    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert('Not enough letters!')
        return
    }

    if (!WORDS.includes(guessString)) {
        alert('Word not in list')
        return
    }

    for (let i = 0; i < 5; i++){
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        
    }
}