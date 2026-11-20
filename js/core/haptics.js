/**
 * Optionale, kurze Vibrationssignale fuer Touch-Eingaben.
 * Browser ohne Vibration API werden ohne Fehler unterstuetzt.
 */
const HAPTIC_PATTERNS = Object.freeze({
    tap: 10,
    move: 18
});

export function triggerHapticFeedback(type = "tap") {
    if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
        return false;
    }

    const pattern = HAPTIC_PATTERNS[type] ?? HAPTIC_PATTERNS.tap;

    try {
        return navigator.vibrate(pattern);
    } catch {
        // Der Browser oder das Geraet kann Vibrationen blockieren.
        return false;
    }
}

/** Fuegt einem normalen Button haptisches Feedback hinzu. */
export function addButtonHaptics(button) {
    if (!button) return;

    button.addEventListener("pointerdown", (event) => {
        if (event.isPrimary === false || event.button > 0) return;
        triggerHapticFeedback("tap");
    });

    // Tastatur-/Assistive-Technologie-Aktivierung (ohne Pointer-Ereignis).
    button.addEventListener("click", (event) => {
        if (event.detail === 0) {
            triggerHapticFeedback("tap");
        }
    });
}
