console.log("script is connected");

const Gameboard = (() => {
    const array = ["", "", "", "", "", "", "", "", ""];

    const showBoard = () => [...array]; // a copy, so outside code can't change the real board

    const setBoard = (index, value) => {
        if (array[index] === "") {
            array[index] = value;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        array.fill("");
    };

    return { showBoard, setBoard, resetBoard };
})();

const player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return { getName, getSymbol };
};

const gamecontroller = (() => {
    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");

    let currentPlayer = player1;
    let gameOver = false;

    const winlines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWin = (symbol) => {
        const board = Gameboard.showBoard();
        return winlines.some(line => line.every(index => board[index] === symbol));
    };

    const checkTie = () => {
        const board = Gameboard.showBoard();
        return board.every(square => square !== "");
    };

    const playposition = (index) => {
        if (gameOver) {
            console.log("The game is over. Call newGame() to play again.");
            return;
        }

        if (!Gameboard.setBoard(index, currentPlayer.getSymbol())) {
            console.log(`${currentPlayer.getName()}, that spot is taken. Try again.`);
            return;
        }

        if (checkWin(currentPlayer.getSymbol())) {
            console.log(`${currentPlayer.getName()} wins!`);
            gameOver = true;
            return;
        }

        if (checkTie()) {
            console.log("It's a tie!");
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const newGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        gameOver = false;
    };

    return { playposition, newGame };
})();

// Test 1: X wins on the fifth move
[0, 3, 1, 4, 2].forEach(gamecontroller.playposition);
gamecontroller.playposition(5);   // refused, game over

// Test 2: a tie
gamecontroller.newGame();
[0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(gamecontroller.playposition);