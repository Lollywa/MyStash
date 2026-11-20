import { initNavigation } from "./core/navigation.js";
import { initTicTacToe } from "./features/tic-tac-toe/index.js";
import { loadTheme } from "./core/theme.js";

// Grundfunktionen sofort initialisieren, damit die App nicht auf das Theme warten muss.
initNavigation();
initTicTacToe();

// Farben aus theme.json laden. CSS-Fallbacks halten die App auch offline funktionsfaehig.
loadTheme();

// Service Worker registrieren (Caching wird separat implementiert).
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch((error) => {
            console.warn("Service Worker konnte nicht registriert werden:", error);
        });
    });
}
