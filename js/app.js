import { initNavigation } from "./navigation.js";
import { initTicTacToe } from "./games/tic-tac-toe.js";

// Navigation und Spiele initialisieren.
initNavigation();
initTicTacToe();

// Service Worker registrieren (die Datei sw.js bleibt vorerst unverändert).
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch((error) => {
            console.error("Service Worker konnte nicht registriert werden:", error);
        });
    });
}
