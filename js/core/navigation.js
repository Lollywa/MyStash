import { addButtonHaptics } from "./haptics.js";

/** Initialisiert die Navigation zwischen Feature-Übersicht und Tic-Tac-Toe. */
export function initNavigation() {
    const lobbyView = document.getElementById("lobbyView");
    const tttView = document.getElementById("tttView");
    const headerSubtitle = document.getElementById("headerSubtitle");
    const backBtn = document.getElementById("backBtn");
    const openTttBtn = document.getElementById("openTttBtn");

    function showLobby() {
        tttView.classList.add("hidden");
        lobbyView.classList.remove("hidden");
        backBtn.classList.add("hidden");
        headerSubtitle.textContent = "Deine Features. Alles an einem Ort.";
    }

    function showTicTacToe() {
        lobbyView.classList.add("hidden");
        tttView.classList.remove("hidden");
        backBtn.classList.remove("hidden");
        headerSubtitle.textContent = "Tic-Tac-Toe · Zwei Spieler";
    }

    addButtonHaptics(openTttBtn);
    addButtonHaptics(backBtn);

    openTttBtn.addEventListener("click", showTicTacToe);
    backBtn.addEventListener("click", showLobby);
}
