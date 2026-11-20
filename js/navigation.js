/**
 * Initialisiert die Navigation zwischen Spiele-Lobby und Tic-Tac-Toe.
 */
export function initNavigation() {
    const lobbyView = document.getElementById("lobbyView");
    const tttView = document.getElementById("tttView");
    const headerTitle = document.getElementById("headerTitle");
    const backBtn = document.getElementById("backBtn");
    const openTttBtn = document.getElementById("openTttBtn");

    function showLobby() {
        tttView.classList.add("hidden");
        lobbyView.classList.remove("hidden");
        backBtn.classList.add("hidden");
        headerTitle.textContent = "Spielehalle";
    }

    function showTicTacToe() {
        lobbyView.classList.add("hidden");
        tttView.classList.remove("hidden");
        backBtn.classList.remove("hidden");
        headerTitle.textContent = "Tic-Tac-Toe";
    }

    openTttBtn.addEventListener("click", showTicTacToe);
    backBtn.addEventListener("click", showLobby);
}
