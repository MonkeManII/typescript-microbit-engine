class Player extends Engine.GameObject {
    constructor(position: Engine.Vector2) {
        super(position, 255);
    }

    tick(): void {
        if (inputs[0].Get()) {
            this.moveX(-0.3);
        }
        if (inputs[1].Get()) {
            this.moveX(0.3);
        }
        if (inputs[2].Get()) {
            this.moveY(0.3);
        }
        if (inputs[3].Get()) {
            this.moveY(-0.3);
        }
    }
}

const inputs: Engine.Input[] = [
    new Engine.Input(null, TouchPin.P0),
    new Engine.Input(null, TouchPin.P1),
    new Engine.Input(null, TouchPin.P2),
    new Engine.Input(Button.A, null),
];

let objects: Engine.GameObject[] = [];
let currentLevel: Engine.Level;
let player: Player = null;
let camera: Engine.Vector2 = Engine.Vector2.zero;

const framesPerSecond: number = 30

function startLevel(level: Engine.Level): void {
    objects = [];
    currentLevel = level;
    player = new Player(level.startPosition.subtractBy(Engine.Vector2.one));
}


startLevel(Engine.Level.Generate(30, 30));

function draw(): void {    
    Utils.clearScreen();
    camera = player.position.copy();
    camera.x -= 2;
    camera.y -= 2;
    currentLevel.draw(camera);
    for (let i: number = 0; i < objects.length; i++) {
        objects[i].tick();
        objects[i].draw(camera);
    }
}

loops.everyInterval(Math.round((1 / framesPerSecond) * 1000), draw);