namespace Utils {
    /**
     * An abstract class containing various utilities for psuedorandom numbers.
     */
    export abstract class Random {
        /**
         * Generates a random integer from min-max (inclusive)
         */
        static randInt(min: number, max: number): number {
            return Math.round(Random.randDecimal(min, max));
        }
        /**
         * Generates a random decimal from min-max (inclusive)
         */
        static randDecimal(min: number, max: number): number {
            return (Math.random() * (max - min)) + min;
        }
    }
}