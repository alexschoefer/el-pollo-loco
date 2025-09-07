class World {
    character = new Character();
    endboss = new EndBoss();
    // level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    statusbarEndboss = new StatusbarEndboss();
    chicken = new Chicken();
    smallchicken = new SmallChicken();
    throwableObjects = [];
    bottleCollection = [];
    coinsCollection = [];
    maxCoins = level1.coins.length;
    endScreen = null;
    gameIsOver = false;
    animationFrameId = null;


    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level; 
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.endboss = this.level.endboss;
    }

    run() {
        setInterval(() => {
            if (this.gameIsOver) return; 
            this.checkCollisionsChickens();
            this.checkThrowObjects();
            this.checkCollisionsBottleCharacter();
            this.checkCollisionCoins();
            this.checkCollisionEndboss();
            this.checkCollisionEndbossCharacter();
            this.checkEndbossDistanceToCharacter();
            this.checkCollisionBottleEnemies();
            this.checkGameOver();
        }, 200);
    }

    //prüft eine Collision mit einem anderen Objekt Chicken und reduziert die Energie des Characters
    checkCollisionsChickens() {
        level1.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead) {
                if ((this.character.y + this.character.height) < (enemy.y + enemy.height * 0.75)) {
                    if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                        enemy.isDead = true;
                        enemy.speed = 0;
                        this.removeDeadChickenFromMap(enemy);
                    }
                } else {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkCollisionsBottleCharacter() {
        level1.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCollection.push(bottle);
                this.updateBottleStatusbar(); 
                this.removeBottleFromMap(bottle);
            }
        })
    }

    checkCollisionBottleEnemies() {
        this.throwableObjects.forEach((bottle) => {
            level1.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle) && !enemy.isDead) {
                    enemy.isDead = true;
                    enemy.speed = 0;
                    this.removeDeadChickenFromMap(enemy);
                    bottle.hasSplashed = true;
                }
            });
        });
    }

    checkCollisionEndbossCharacter() {
        if (this.endboss.isColliding(this.character)) {
            this.character.hit();
            this.statusbarHealth.setPercentage(this.character.energy);
            this.endboss.attackEndboss();
            this.endboss.moveLeftEndboss();
        } else {
            this.endboss.stopAttackEndboss();
        }
    }

    checkCollisionCoins() {
        level1.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinsCollection.push(coin);
                this.statusbarCoins.setPercentage(Math.min(this.coinsCollection.length / this.level.maxCoins * 100, 100));
                this.removeCoinsFromMap(coin);
            }
        })
    }

    checkCollisionEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                this.endboss.hit();
                bottle.hasSplashed = true;
                this.statusbarEndboss.setPercentage(this.endboss.energy);
            }
        });
    }

    removeBottleFromMap(bottle) {
        level1.bottles = level1.bottles.filter(b => b !== bottle);
    }


    removeCoinsFromMap(coin) {
        level1.coins = level1.coins.filter(b => b !== coin);
    }

    removeDeadChickenFromMap(enemy) {
        setTimeout(() => {
            level1.enemies = level1.enemies.filter(e => e !== enemy);
        }, 2500);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottleCollection.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 150)
            this.throwableObjects.push(bottle);
            this.bottleCollection.pop();
            this.updateBottleStatusbar();
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
        this.addToMap(this.endboss, this.height);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);




        //verschiebt die Kamera nach rechts
        this.ctx.translate(-this.camera_x, 0);

        if (this.endScreen && this.endScreen.visible) {
            this.endScreen.draw(this.ctx);
        }

        this.animationFrameId = requestAnimationFrame(() => this.draw());

        // //DrawImage wird immer wieder aufgerufen
        // let self = this;
        // requestAnimationFrame(function () {
        //     self.draw();
        // });
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

    checkEndbossDistanceToCharacter() {
        let distance = this.character.x - this.endboss.x;
        if (Math.abs(distance) < 300) {
            this.endboss.isMoving = true;
            if (distance > 0) {
                this.endboss.moveRightEndboss();
            } else {
                this.endboss.moveLeftEndboss();
            }
        } else {
            this.endboss.stopMovement();
        }
    }

    checkGameOver() {
        if (this.character.isDead()) {
            this.endScreen = new Endscreen(Endscreen.IMAGE_GAMEOVER);
            this.endScreen.show();
            this.gameIsOver = true;
            this.showEndscreenButtons();
        }
    
        if (this.endboss.isDead()) {
            this.endScreen = new Endscreen(Endscreen.IMAGE_WIN);
            this.endScreen.show();
            this.gameIsOver = true;
            this.showEndscreenButtons();
        }
    }

    showEndscreenButtons() {
        const btnContainer = document.getElementById('btn-endscreen-container');
        btnContainer.classList.remove('d_none');
    }

    updateBottleStatusbar() {
        const percentage = Math.min(
            (this.bottleCollection.length / this.level.maxBottles) * 100,
            100
        );
        this.statusbarBottles.setPercentage(percentage);
    }
    resetWorld() {
        // Stop Animationen / Intervall
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    
        // Entferne Endscreen und setze Flag zurück
        this.endScreen = null;
        this.gameIsOver = false;
    
        // Falls nötig: Kamera zurücksetzen
        this.camera_x = 0;
    
        // Starte den Loop neu
        this.draw();
        this.run();
    }
}