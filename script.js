const words = [
  "POMME","ARBRE","CHAIR","LIVRE","FLEUR","TIGRE","ROUGE","TABLE",
  "PLAGE","NEIGE","JOUER","BRUIT","PETIT","CHANT","FORCE","GRACE",
  "NUAGE","ECRAN","ROUTE","SABLE","AMOUR","NAGER","BOITE","POIRE",
  "SONNE","VILLE"
];

const gridContainer = document.getElementById('grid-container');
const form = document.getElementById('guess-form');
const messageDisplay = document.getElementById('message');
const newGameBtn = document.getElementById('new-game');

let attemptsLeft = 6;
let currentRow = 0;
let secretWord = "";
let gameOver = false; 

const createGrid = () => {
    gridContainer.innerHTML = '';
    for (let i = 0; i < 6 * 5; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gridContainer.appendChild(cell);
    }
};

const pickWord = () => { 
    secretWord = words[Math.floor(Math.random() * words.length)];
    console.log("Mot secret :", secretWord);
};

const revealFirstLetter = () => { 
    const cells = document.querySelectorAll('.cell');
    cells[0].textContent = secretWord[0];
    cells[0].classList.add('green');
};

const updateCursor = () => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => cell.classList.remove('cursor'));

    const rowStart = currentRow * 5;
    const rowEnd = rowStart + 5;

    for (let i = rowStart; i < rowEnd; i++) {
        if (!cells[i].textContent) {
            cells[i].classList.add('cursor');
            break;
        }
    }
};

document.addEventListener("keydown", (e) => {

if (gameOver) return;

   
if (e.key === "Enter") {
    e.preventDefault();

    const cells = document.querySelectorAll('.cell');
    const rowStart = currentRow * 5;
    const rowEnd = rowStart + 5;
        
    let complete = true;
        for (let i = rowStart; i < rowEnd; i++) {
            if (!cells[i].textContent) {
                complete = false;
                break;
            }
            } if (complete) {
            form.requestSubmit(); 
        } 
        return; 
}

    const cells = document.querySelectorAll('.cell');
    const rowStart = currentRow * 5;
    const rowEnd = rowStart + 5;

 if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
    for (let i = rowStart; i < rowEnd; i++) {
        if (!cells[i].textContent) {

            if (currentRow === 0 && i === 0) {
                cells[i].textContent = secretWord[0];
                cells[i].classList.add('green');
            } else {
                cells[i].textContent = e.key.toUpperCase();
            }

            updateCursor();
            break;
        }
    }
}

if (e.key === "Backspace") {
    for (let i = rowEnd - 1; i >= rowStart; i--) {
        if (cells[i].textContent && !(currentRow === 0 && i === 0)) {
            cells[i].textContent = "";
            break;
        }
    }
     
    updateCursor();
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (gameOver) return;

    const cells = document.querySelectorAll('.cell');
    const rowStart = currentRow * 5;

    let guess = "";
    for (let i = rowStart; i < rowStart + 5; i++) {
        guess += cells[i].textContent || "";
    }

    if (guess.length !== 5) {
        messageDisplay.textContent = "Le mot doit contenir exactement 5 lettres !";
        return;
    }

    updateGrid(guess);

    if (guess === secretWord) {
        messageDisplay.textContent = " Félicitations ! Vous avez trouvé le mot !";
        gameOver = true;
        return;
    }

    currentRow++;

    if (currentRow === 6) {
        messageDisplay.textContent = ` Défaite ! Le mot était : ${secretWord}`;
        gameOver = true;
        return;
    }

    updateCursor();
});

const updateGrid = (guess) => {
    const cells = document.querySelectorAll('.cell');
    const validatedLetters = [];

    for (let i = 0; i < 5; i++) {
        const cell = cells[currentRow * 5 + i];
        cell.textContent = guess[i];

        if (guess[i] === secretWord[i]) {
            cell.classList.add('green');
            validatedLetters.push(guess[i]);
        }
    }
    for (let i = 0; i < 5; i++) {
        const cell = cells[currentRow * 5 + i];
        if (cell.classList.contains('green')) continue;

        if (secretWord.includes(guess[i]) && !validatedLetters.includes(guess[i])) {
            cell.classList.add('orange');
        } else {
            cell.classList.add('grey');
        }
    }
};

const newGame = () => { 
    currentRow = 0;
    attemptsLeft = 6;
    messageDisplay.textContent = "";

    createGrid();
    pickWord();
    revealFirstLetter();
    updateCursor();
};


newGameBtn.addEventListener("click", newGame);

newGame();
