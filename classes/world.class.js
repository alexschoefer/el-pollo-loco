class World {
    endboss = new EndBoss();
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
    endScreen = null;
    gameIsOver = false;
    animationFrameId = null;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.keyboard = keyboard;
        this.level = level;
        this.maxCoins = this.level.coins.length;
        this.maxBottles = this.level.bottles.length;
        this.audioManager = new AudioManager();
        this.character = new Character(this.audioManager);
        this.draw();
        this.setWorld();
        this.run();
        if (!this.audioManager.isMuted) {
            this.audioManager.sounds.game.play().catch((e) => {
                console.warn('Autoplay blockiert den Gamesound:', e);
            });
        }
        this.soundIcon = new Image();
        this.isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;
        this.soundIcon.src = this.isMuted
            ? "assets/img-main-background/muted-icon.png"
            : "assets/img-main-background/unmuted-icon.png";
        this.soundIconLoaded = false;
        this.soundIcon.onload = () => {
            this.soundIconLoaded = true;
        };
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
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead) {
                if ((this.character.y + this.character.height) < (enemy.y + enemy.height * 0.75)) {
                    if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                        enemy.isDead = true;
                        enemy.speed = 0;
                        this.audioManager.play('chickenHurt');
                        this.removeDeadChickenFromMap(enemy);
                    }
                } else {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                    this.audioManager.play('hurt');
                }
            }
        });
    }

    checkCollisionsBottleCharacter() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCollection.push(bottle);
                this.updateBottleStatusbar();
                this.audioManager.play('bottle');
                this.removeBottleFromMap(bottle);
            }
        })
    }

    checkCollisionBottleEnemies() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle) && !enemy.isDead) {
                    enemy.isDead = true;
                    enemy.speed = 0;
                    this.audioManager.play('chickenHurt');
                    this.removeDeadChickenFromMap(enemy);
                    bottle.hasSplashed = true;
                }
            });
        });
    }

    checkCollisionEndbossCharacter() {
        if (this.endboss.isColliding(this.character)) {
            this.character.hit();
            this.audioManager.play('hurt');
            this.audioManager.play('endbossAttack');
            this.statusbarHealth.setPercentage(this.character.energy);
            this.endboss.attackEndboss();
            this.endboss.moveLeftEndboss();
        } else {
            this.endboss.stopAttackEndboss();
        }
    }

    checkCollisionCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinsCollection.push(coin);
                this.statusbarCoins.setPercentage(Math.min(this.coinsCollection.length / this.level.maxCoins * 100, 100));
                this.audioManager.play('coin');
                this.removeCoinsFromMap(coin);
            }
        })
    }

    checkCollisionEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                this.endboss.hit();
                this.audioManager.play('chickenHurt');
                bottle.hasSplashed = true;
                this.statusbarEndboss.setPercentage(this.endboss.energy);
            }
        });
    }

    removeBottleFromMap(bottle) {
        this.level.bottles = this.level.bottles.filter(b => b !== bottle);
    }


    removeCoinsFromMap(coin) {
        this.level.coins = this.level.coins.filter(b => b !== coin);
    }

    removeDeadChickenFromMap(enemy) {
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
        }, 2500);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottleCollection.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 150, this.audioManager)
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
        this.drawSoundIcon();
    }

    drawSoundIcon() {
        if (!this.soundIconLoaded) return;
        const iconSize = 40;
        const padding = 60;
        const x = this.canvas.width - iconSize - padding;
        const y = padding;
        this.soundIconBounds = { x, y, width: iconSize, height: iconSize };
        this.ctx.drawImage(this.soundIcon, x, y, iconSize, iconSize);
    }

    drawFullscreenIcon() {

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
            this.stopEnemies();
            this.showEndscreenButtons();
            this.audioManager.sounds.game.pause();
            if (!this.audioManager.isMuted) {
                this.audioManager.play('gameover');
            }
        } else if (this.endboss.isDead()) {
            this.endScreen = new Endscreen(Endscreen.IMAGE_WIN);
            this.endScreen.show();
            this.gameIsOver = true;
            this.stopEnemies();
            this.showEndscreenButtons();
            this.audioManager.sounds.game.pause();
            if (!this.audioManager.isMuted) {
                this.audioManager.play('win');
            }
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

    toggleSound() {
        this.isMuted = !this.isMuted;
        this.soundIcon.src = this.isMuted
            ? "assets/img-main-background/muted-icon.png"
            : "assets/img-main-background/unmuted-icon.png";
        this.audioManager.muteAll(this.isMuted);
        localStorage.setItem("isMuted", JSON.stringify(this.isMuted));
        if (!this.isMuted) {
            this.audioManager.sounds.game.play().catch((e) => {
                console.warn('Konnte Gamesound nicht abspielen:', e);
            });
        }
    }

    handleCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        const bounds = this.soundIconBounds;
        if (
            bounds &&
            clickX >= bounds.x &&
            clickX <= bounds.x + bounds.width &&
            clickY >= bounds.y &&
            clickY <= bounds.y + bounds.height
        ) {
            this.toggleSound();
        }
    }

    stopEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.speed = 0;
        });
        this.endboss.speed = 0;  // Falls der Endboss auch stoppen soll
    }

}