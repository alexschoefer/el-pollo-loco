class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    statusbarEndboss = new StatusbarEndboss();
    throwableObjects = [];
    bottleCollection = [];
    coinsCollection = [];
    maxCoins = level1.coins.length;
    
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsBottle();
            this.checkCollisionCoins();
        }, 200);
    }

    //prüft eine Collision mit einem anderen Objekt Chicken und reduziert die Energie des Characters
    checkCollisions() {
        level1.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        })
    }

    checkCollisionsBottle() {
        level1.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCollection.push(bottle);
                this.statusbarBottles.setPercentage(this.bottleCollection.length * 20);
                this.removeBottleFromMap(bottle);
            }
        })
    }

    checkCollisionCoins() {
        level1.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                console.log('Coin getroffen');
                console.log(this.maxCoins);
                
                this.coinsCollection.push(coin);
                console.log(this.coinsCollection.length);
                this.statusbarCoins.setPercentage(Math.min(this.coinsCollection.length / this.level.maxCoins * 100, 100));
                this.removeCoinsFromMap(coin);
            }
        })
    }

    removeBottleFromMap(bottle) {
        level1.bottles = level1.bottles.filter(b => b !== bottle);
    }


    removeCoinsFromMap(coin) {
        level1.coins = level1.coins.filter(b => b !== coin);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottleCollection.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 150)
            this.throwableObjects.push(bottle);
            this.bottleCollection.pop();
            this.statusbarBottles.setPercentage(this.bottleCollection.length * 20);
        }
    }

    draw() {
        //clearRect löscht das aktuelle img in der Canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //verschiebt die Kamera nach links
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);


        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap([this.statusbarHealth]);
        this.addObjectsToMap([this.statusbarCoins]);
        this.addObjectsToMap([this.statusbarBottles]);
        this.addObjectsToMap([this.statusbarEndboss]);
        this.ctx.translate(this.camera_x, 0);

        //fügt die Elemente der Welt hinzu
        this.addToMap(this.character, this.height);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);



        //verschiebt die Kamera nach rechts
        this.ctx.translate(-this.camera_x, 0);

        //DrawImage wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}