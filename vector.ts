namespace Engine {
    /**
     * A vector containing 2 numbers (x and y)
     */
    export class Vector2 {
        /**
         * The X component of this vector.
         */
        x: number;

        /**
         * The Y component of this vector.
         */
        y: number;

        /**
         * (0, 0)
         */
        static zero = new Vector2(0, 0);
        /**
         * (1, 1)
         */
        static one = new Vector2(0, 0);
        /**
         * (0, 1)
         */
        static up = new Vector2(0, 1);
        /**
         * (0, -1)
         */
        static down = new Vector2(0, -1);
        /**
         * (-1, 0)
         */
        static left = new Vector2(-1, 0);
        /**
         * (1, 0)
         */
        static right = new Vector2(1, 0);

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        /**
         * Generates a random vector from (min, min) to (max, max) (inclusive)
         */
        static random(min: Vector2, max: Vector2) {
            return new Vector2(
                Utils.Random.randInt(min.x, max.x),
                Utils.Random.randInt(min.y, max.y)
            );
        }

        /**
         * Converts this vector to a string formatted as "(x, y)"
         */
        toString(): string {
            return `(${this.x}, ${this.y})`;
        }

        /**
         * Copies the vector because classes are a bitch
         */
        copy(): Vector2 {
            return new Vector2(this.x, this.y);
        }

        /**
         * Rounds each component of this vector to the nearest integer.
         */
        round(): Vector2 {
            return new Vector2(Math.round(this.x), Math.round(this.y));
        }

        /**
         * this + other
         */
        add(other: Vector2): Vector2 {
            return new Vector2(this.x + other.x, this.y + other.y);
        }

        /**
         * this - other
         */
        subtractBy(other: Vector2): Vector2 {
            return new Vector2(this.x - other.x, this.y - other.y);
        }

        /**
         * this * other
         */
        multiply(other: number): Vector2 {
            return new Vector2(this.x * other, this.y * other);
        }

        /**
         * this / other
         */
        divideBy(other: number): Vector2 {
            if (other === 0) {
                console.error("Vector2 division by zero!");
                return Vector2.zero;
            } else {
                return new Vector2(this.x / other, this.y / other);
            }
        }
    }
}