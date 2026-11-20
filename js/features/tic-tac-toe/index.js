import { addButtonHaptics, triggerHapticFeedback } from "../../core/haptics.js";

/** Tic-Tac-Toe fuer zwei Spieler an einem Geraet. */
export function initTicTacToe() {
    const WIN_PATTERNS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
        [0, 4, 8], [2, 4, 6]             // Diagonalen
    ];

    let boardState = Array(9).fill(null);
    let currentPlayer = "X";
    let startingPlayer = "X";
    let gameOver = false;
    let scores = { X: 0, O: 0, draw: 0 };

    const boardEl = document.getElementById("board");
    const statusBar = document.getElementById("statusBar");
    const scoreXEl = document.getElementById("scoreX");
    const scoreOEl = document.getElementById("scoreO");
    const scoreDrawEl = document.getElementById("scoreDraw");
    const boxX = document.getElementById("boxX");
    const boxO = document.getElementById("boxO");
    const newRoundBtn = document.getElementById("newRoundBtn");
    const resetScoreBtn = document.getElementById("resetScoreBtn");

    addButtonHaptics(newRoundBtn);
    addButtonHaptics(resetScoreBtn);

    function updateTurnHighlight() {
        boxX.classList.toggle("active-x", !gameOver && currentPlayer === "X");
        boxO.classList.toggle("active-o", !gameOver && currentPlayer === "O");
    }

    function renderBoard(winCombo = []) {
        boardEl.innerHTML = "";

        boardState.forEach((val, idx) => {
            const cell = document.createElement("button");
            cell.type = "button";
            cell.className = "cell";
            cell.setAttribute("aria-label", "Feld " + (idx + 1) + (val ? ", " + val : ", frei"));

            if (val) {
                cell.textContent = val;
                cell.classList.add(val.toLowerCase(), "taken");
            }

            if (winCombo.includes(idx)) {
                cell.classList.add("win");
            }

            cell.addEventListener("pointerdown", (event) => {
                event.preventDefault();
                handleMove(idx);
            });

            boardEl.appendChild(cell);
        });
    }

    function checkWinner() {
        for (const pattern of WIN_PATTERNS) {
            const [a, b, c] = pattern;

            if (
                boardState[a] &&
                boardState[a] === boardState[b] &&
                boardState[a] === boardState[c]
            ) {
                return { winner: boardState[a], combo: pattern };
            }
        }

        if (boardState.every((cell) => cell !== null)) {
            return { winner: "draw", combo: [] };
        }

        return null;
    }

    function handleMove(index) {
        if (gameOver || boardState[index] !== null) return;

        triggerHapticFeedback("move");
        boardState[index] = currentPlayer;
        const result = checkWinner();

        if (result) {
            gameOver = true;

            if (result.winner === "draw") {
                scores.draw++;
                scoreDrawEl.textContent = scores.draw;
                statusBar.innerHTML = '<span class="status-indicator status-indicator-success"></span> Unentschieden!';
            } else {
                scores[result.winner]++;
                scoreXEl.textContent = scores.X;
                scoreOEl.textContent = scores.O;
                statusBar.innerHTML = '<span class="status-indicator status-indicator-success"></span> Spieler ' + result.winner + ' gewinnt!';
            }

            updateTurnHighlight();
            renderBoard(result.combo);
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusBar.innerHTML = '<span class="status-indicator"></span> Spieler ' + currentPlayer + ' ist am Zug';
        updateTurnHighlight();
        renderBoard();
    }

    function startNewRound() {
        startingPlayer = startingPlayer === "X" ? "O" : "X";
        currentPlayer = startingPlayer;
        boardState = Array(9).fill(null);
        gameOver = false;

        statusBar.innerHTML = '<span class="status-indicator"></span> Spieler ' + currentPlayer + ' beginnt';
        updateTurnHighlight();
        renderBoard();
    }

    function resetScores() {
        scores = { X: 0, O: 0, draw: 0 };
        scoreXEl.textContent = "0";
        scoreOEl.textContent = "0";
        scoreDrawEl.textContent = "0";

        startingPlayer = "X";
        currentPlayer = "X";
        boardState = Array(9).fill(null);
        gameOver = false;

        statusBar.innerHTML = '<span class="status-indicator"></span> Spieler X ist am Zug';
        updateTurnHighlight();
        renderBoard();
    }

    newRoundBtn.addEventListener("click", startNewRound);
    resetScoreBtn.addEventListener("click", resetScores);

    renderBoard();
}
