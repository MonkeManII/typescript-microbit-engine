namespace Engine {
    /**
     * A class to sort of merge the functionality of pins and buttons.
     */
    export class Input {
        /**
         * The button to use, if applicable.
         */
        private button: Button;
        /**
         * The pin to use, if applicable.
         */
        private pin: TouchPin;
        /**
         * Whether to use the pin or the button.
         */
        private isPin: boolean;

        constructor(btn: Button=null, pin: TouchPin=null) {
            if (btn === null) {
                this.pin=pin;
                this.isPin=true;
                return;
            } else {
                this.button=btn;
                this.isPin=false;
                return;
            }
        }

        /**
         * Returns whether or not this input is being held.
         */
        Get(): boolean {
            if (this.isPin) {
                return input.pinIsPressed(this.pin);
            } else {
                return input.buttonIsPressed(this.button);
            }
        }
    }
}