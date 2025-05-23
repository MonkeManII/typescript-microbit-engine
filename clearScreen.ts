namespace Utils {
    /**
     * Resets all pins on the screen to be off.
     */
    export function clearScreen(): void {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                led.unplot(i, j);
            }
        }
    }
}