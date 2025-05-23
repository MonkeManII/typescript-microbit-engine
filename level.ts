namespace Engine {
    /**
     * A level.
     */
    export class Level {
        tiles: boolean[] = [];
        width: number;
        height: number;
        startPosition: Vector2;

        constructor(width: number, height: number) {
            this.width = width;
            this.height = height;
            this.startPosition = Vector2.zero;

            for (let i: number = 0; i < width*height; i++) {
                this.tiles.push(true);
            }
        }

        draw(camera: Vector2) {
            for (let i: number = -2; i < 3; i++) {
                for (let j: number = -2; j < 3; j++) {
                    let tilePosition: Vector2 = camera.add(new Vector2(i + 2, j + 2));
                    let tileType: boolean = this.GetTileAt(tilePosition);
                    let visiblePosition: Vector2 = tilePosition.subtractBy(camera);

                    if (tileType) {
                        led.plotBrightness(visiblePosition.x, visiblePosition.y, 50);
                    }
                }
            }
        }

        PosIsInBounds(position: Vector2): boolean {
            if (position.x >= 0 && position.x < this.width) {
                if (position.y >= 0 && position.y < this.height) {
                    return true;
                }
            }
            return false;
        }

        GetTileAt(position: Vector2): boolean {
            position = position.round();
            if (this.PosIsInBounds(position)) {
                return this.tiles[position.x + (position.y * this.width)];
            } else {
                return false;
            }
        }

        SetTileAt(position: Vector2, value: boolean): void {
            position = position.round();
            if (this.PosIsInBounds(position)) {
                this.tiles[position.x + (position.y * this.width)] = value;
            }
        }

        SetSquareAt(position: Vector2, size: Vector2, value: boolean) {
            position = position.subtractBy(size.divideBy(2).round());

            for (let i: number = 0; i < size.x; i++) {
                for (let j: number = 0; j < size.y; j++) {
                    this.SetTileAt(position.add(new Vector2(i, j)), value);
                }
            }
        }

        static Generate(width: number, height: number): Level {
            let level: Level = new Level(width, height);

            level.startPosition = Vector2.random(
                new Vector2(3, 3),
                new Vector2(width - 3, height - 3)
            );

            level.SetSquareAt(level.startPosition, new Vector2(5, 5), false);
            
            return level;
        }
    }
}