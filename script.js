const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let circleTurn;

const startGame = () => {
    circleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.textContent = ''; // Clear the cell content
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setStatusText();
    resultScreen.style.display = 'none';
    gameBoard.style.display = 'grid';
    restartButton.style.display = 'block';
};

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = circleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setStatusText();
    }
};

const endGame = (draw) => {
    gameBoard.style.display = 'none';
    restartButton.style.display = 'none';
    resultScreen.style.display = 'flex';
    if (draw) {
        resultMessage.innerText = 'Draw!';
    } else {
        resultMessage.innerText = `${circleTurn ? "O" : "X"} Wins!`;
    }
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
};

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
    cell.textContent = circleTurn ? 'O' : 'X'; // Add the X or O
};

const swapTurns = () => {
    circleTurn = !circleTurn;
};

const setStatusText = () => {
    statusText.innerText = `${circleTurn ? "O's" : "X's"} Turn`;
};

const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

restartButton.addEventListener('click', startGame);
newGameButton.addEventListener('click', startGame);

startGame();
