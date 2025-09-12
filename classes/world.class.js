class World {
    endboss = new EndBoss();
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    bottleCollection = [];
    coinsCollection = [];
    endScreen = null;
    gameIsOver = false;
    animationFrameId = null;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.maxCoins = this.level.coins.length;
        this.maxBottles = this.level.bottles.length;
        this.audioManager = new AudioManager();
        this.character = new Character(this.audioManager);
        this.endboss = this.level.endboss;
        this.statusbarHealth = new StatusbarHealth();
        this.statusbarCoins = new StatusbarCoins();
        this.statusbarBottles = new StatusbarBottles();
        this.statusbarEndboss = new StatusbarEndboss();
        this.throwableObjects = [];
        this.bottleCollection = [];
        this.coinsCollection = [];
        this.endScreen = null;
        this.gameIsOver = false;
        this.camera_x = 0;
        this.animationFrameId = null;
        this.setWorld();
        this.draw();
        this.run();

        if (!this.audioManager.isMuted) {
            this.audioManager.sounds.game.play().catch((e) => {
                console.warn('Autoplay blockiert den Gamesound:', e);
            });
        }

        // ⬇️ SOUND ICON vorbereiten
        this.soundIcon = new Image();
        this.isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;
        this.soundIcon.src = this.isMuted
            ? "assets/img-main-background/muted-icon.png"
            : "assets/img-main-background/unmuted-icon.png";
        this.soundIconLoaded = false;
        this.soundIcon.onload = () => {
            this.soundIconLoaded = true;
        };

        this.fullscreenIcon = new Image();
        this.isFullscreen = JSON.parse(localStorage.getItem('isFullscreen')) || false;
        this.fullscreenIcon.src = this.isFullscreen
            ? "assets/img-main-background/fullscreen-minimize.png"
            : "assets/img-main-background/fullscreen-expand.png";
        this.fullscreenIconLoaded = false;
        this.fullscreenIcon.onload = () => {
            this.fullscreenIconLoaded = true;
        };

        window.addEventListener('resize', () => {
            if (document.fullscreenElement) {
                this.resizeCanvas();
            }
        });

        document.addEventListener('fullscreenchange', () => {
            const isFullscreen = !!document.fullscreenElement;
            if (isFullscreen) {
                this.resizeCanvas();
            } else {
                this.canvas.width = 720;
                this.canvas.height = 480;
            }
            this.isFullscreen = isFullscreen;
            this.fullscreenIcon.src = this.isFullscreen
                ? "assets/img-main-background/fullscreen-minimize.png"
                : "assets/img-main-background/fullscreen-expand.png";
            localStorage.setItem("isFullscreen", JSON.stringify(this.isFullscreen));
        });
    }

    /**
    * Connects the character and endboss to the current game world.
    */
    setWorld() {
        this.character.world = this;
        this.endboss = this.level.endboss;
    }

    /**
    * Starts the main game logic loop with a fixed interval.
    */
    run() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.intervalId = setInterval(() => {
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

    /**
    * Checks collisions between the character and chickens (enemies).
    */
    checkCollisionsChickens() {
        this.level.enemies.forEach(enemy => {
            const feet = this.character.y + this.character.height;
            if (this.character.isCharacterFallingOnEnemy(enemy) && !enemy.isDead) {
                enemy.energy = 0;
                enemy.isDead = true;
                enemy.speed = 0;
                this.audioManager.play('chickenHurt');
                this.removeDeadChickenFromMap(enemy);
            } else if (this.character.isColliding(enemy) && !enemy.isDead) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
                this.audioManager.play('hurt');
            }
        });
    }

    /**
    * Checks if the character picks up bottles from the level
    */
    checkCollisionsBottleCharacter() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCollection.push(bottle);
                this.updateBottleStatusbar();
                this.audioManager.play('bottle');
                this.removeFromMap('bottles', bottle);
            }
        })
    }

    /**
    * Checks collisions between thrown bottles and enemies.
    */
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

    /**
    * Checks collisions between character and endboss.
    */
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

    /**
    * Checks if the character picks up coins from the level
    */
    checkCollisionCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinsCollection.push(coin);
                this.statusbarCoins.setPercentage(Math.min(this.coinsCollection.length / this.level.maxCoins * 100, 100));
                this.audioManager.play('coin');
                this.removeFromMap('coins', coin);
            }
        })
    }

    /**
    * Checks if the endboss is hitting by bottles from the level
    */
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

    /**
     * Removes an item (bottle or coin) from map
     * @param {*} arrayName 
     * @param {*} item 
     */
    removeFromMap(arrayName, item) {
        this.level[arrayName] = this.level[arrayName].filter(e => e !== item);
    }

    /**
     * Removes a dead enemy from map
     * @param {*} enemy 
     */
    removeDeadChickenFromMap(enemy) {
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
        }, 2500);
    }

    /**
     * Checks if there are collected bottles for throwing from the character
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottleCollection.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 150, this.audioManager)
            this.throwableObjects.push(bottle);
            this.bottleCollection.pop();
            this.updateBottleStatusbar();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap([this.statusbarHealth]);
        this.addObjectsToMap([this.statusbarCoins]);
        this.addObjectsToMap([this.statusbarBottles]);
        this.addObjectsToMap([this.statusbarEndboss]);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character, this.height);
        this.addToMap(this.endboss, this.height);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
        if (this.endScreen && this.endScreen.visible) {
            this.endScreen.draw(this.ctx);
        }
        this.animationFrameId = requestAnimationFrame(() => this.draw());
        this.drawSoundIcon();
        this.drawFullscreenIcon();
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
        if (!this.fullscreenIconLoaded) return;
        const iconSize = 30;
        const padding = 50;
        const x = this.canvas.width - iconSize - padding;
        const y = this.canvas.height - padding;
        this.fullscreenIconBounds = { x, y, width: iconSize, height: iconSize };
        this.ctx.drawImage(this.fullscreenIcon, x, y, iconSize, iconSize);
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
            this.audioManager.stopAllSounds();
            if (!this.audioManager.isMuted) {
                this.audioManager.play('gameover');
            }
        } else if (this.endboss.isDead()) {
            this.endScreen = new Endscreen(Endscreen.IMAGE_WIN);
            this.endScreen.show();
            this.gameIsOver = true;
            this.stopEnemies();
            this.showEndscreenButtons();
            this.audioManager.stopAllSounds();
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
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.endScreen = null;
        this.gameIsOver = false;
        this.camera_x = 0;
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
            this.audioManager.sounds.game.play().catch(e => console.warn('Konnte Gamesound nicht abspielen:', e));
        }
    }

    toggleFullScreen() {
        if (!document.fullscreenElement) {
            this.canvas.requestFullscreen().then(() => {
                this.isFullscreen = true;
                localStorage.setItem("isFullscreen", "true");
                this.fullscreenIcon.src = "assets/img-main-background/fullscreen-minimize.png";
            }).catch((err) => {
                console.error("Fehler beim Aktivieren des Vollbildmodus:", err);
            });
        } else {
            document.exitFullscreen().then(() => {
                this.isFullscreen = false;
                localStorage.setItem("isFullscreen", "false");
                this.fullscreenIcon.src = "assets/img-main-background/fullscreen-expand.png";
            }).catch((err) => {
                console.error("Fehler beim Beenden des Vollbildmodus:", err);
            });
        }
    }

    isWithinBounds(x, y, bounds) {
        return bounds && x >= bounds.x && x <= bounds.x + bounds.width &&
            y >= bounds.y && y <= bounds.y + bounds.height;
    }

    handleCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        if (this.isWithinBounds(clickX, clickY, this.soundIconBounds)) {
            this.toggleSound();
            return;
        }
        if (this.isWithinBounds(clickX, clickY, this.fullscreenIconBounds)) {
            this.toggleFullScreen();
            return;
        }
    }

    stopEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.speed = 0;
        });
        this.endboss.speed = 0;
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}