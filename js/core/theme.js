/**
 * Laedt das zentrale MyStash-Farbtheme und uebertraegt seine Tokens in CSS-Variablen.
 * Bei fehlender Netzwerk-/Dateiverfuegbarkeit bleiben die CSS-Fallbacks aktiv.
 */
export async function loadTheme() {
    try {
        const response = await fetch(new URL("../../theme.json", import.meta.url), {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(`Theme konnte nicht geladen werden (HTTP ${response.status}).`);
        }

        const data = await response.json();
        const theme = data?.myStashTheme;

        if (!theme || typeof theme !== "object") {
            throw new Error("theme.json enthaelt kein gueltiges myStashTheme-Objekt.");
        }

        const root = document.documentElement;

        for (const [groupName, tokens] of Object.entries(theme)) {
            if (!tokens || typeof tokens !== "object") continue;

            for (const [tokenName, value] of Object.entries(tokens)) {
                if (typeof value !== "string" || !value.trim()) continue;

                const cssToken = tokenName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
                root.style.setProperty(`--color-${groupName}-${cssToken}`, value);
            }
        }

        document.querySelector('meta[name="theme-color"]')?.setAttribute(
            "content",
            theme.background?.primary || "#0D0E12"
        );

        return true;
    } catch (error) {
        console.warn("MyStash verwendet die CSS-Fallback-Farben:", error);
        return false;
    }
}
