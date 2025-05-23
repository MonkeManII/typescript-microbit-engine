namespace Engine {
    /**
     * A class for all non-static objects.
     */
    export class GameObject {
        /**
         * The position of this gameobject relative to the top left corner of the map.
         */
        position: Vector2 = Vector2.zero;
        
        /**
         * How bright the pin is when rendering this object.
         */
        brightness: number = 0;

        /**
         * Where on the 'objects' list this is located.
         */
        private index: number = 0;

        constructor(position: Vector2, brightness: number) {
            this.position = position;
            this.brightness = brightness;
            this.index = objects.length;
            objects.push(this);
        }

        /**
         * Called when another object is deleted.
         * Shifts the index of this down if necessary.
         */
        onOtherKilled(otherIndex: number): void {
            if (otherIndex < this.index) {
                this.index--;
            }
        }

        /**
         * Moves this a certain amount on the X axis.
         * Checks for collisions along the way.
         */
        moveX(amount: number): void {
            for (let i: number = 0; i < Math.abs(amount) * 10; i++) {
                this.position.x += amount / 10;

                if (this.collision()) {
                    while (this.collision()) {
                        this.position.x -= amount / 100;
                    }
                    return;
                }
            }
        }

        /**
         * Moves this a certain amount on the Y axis.
         * Checks for collisions along the way.
         */
        moveY(amount: number): void {
            for (let i: number = 0; i < Math.abs(amount) * 10; i++) {
                this.position.y += amount / 10;

                if (this.collision()) {
                    while (this.collision()) {
                        this.position.y -= amount / 100;
                    }
                    return;
                }
            }
        }

        /**
         * Checks to see if this object overlaps any tiles.
         */
        collision(): boolean {
            let possibleCollisionTiles: number[] = [];
            let basePosition: Vector2 = this.position.round();

            for (let i: number = -2; i < 3; i++) {
                for (let j: number = -2; j < 3; j++) {
                    possibleCollisionTiles.push(i + basePosition.x + ((j + basePosition.y) * currentLevel.width));
                }
            }
            
            for (let i: number = 0; i < possibleCollisionTiles.length; i++) {
                let tileIndex: number = possibleCollisionTiles[i];
                let tileType: boolean = currentLevel.tiles[tileIndex];
                let tilePosition: Vector2 = new Vector2(
                    tileIndex % currentLevel.width,
                    Math.floor(tileIndex / currentLevel.width),
                );

                if (tileType) {
                    if (this.position.x + 0.5 > tilePosition.x - 0.5) {
                        if (this.position.y + 0.5 > tilePosition.y - 0.5) {
                            if (this.position.x - 0.5 < tilePosition.x + 0.5) {
                                if (this.position.y - 0.5 < tilePosition.y + 0.5) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            
            return false;
        }

        /**
         * Deletes this object.
         */
        kill(): void {
            for (let i = 0; i < objects.length; i++) {
                if (i !== this.index) {
                    objects[i].onOtherKilled(this.index);
                }
            }
            objects.splice(this.index, 1);
        }

        /**
         * Draws this to the screen
         */
        draw(camera: Vector2): void {
            let drawPos: Vector2 = this.position.subtractBy(camera).add(Vector2.one.multiply(2)).round();
            if (drawPos.x >= 0 && drawPos.x <= 4) {
                if (drawPos.y >= 0 && drawPos.y <= 4) {
                    led.plotBrightness(drawPos.x, drawPos.y, this.brightness);
                }
            }
        }

        /**
         * Called every frame.
         * Used to update objects each frame (like the player).
         */
        tick(): void {}
    }
}