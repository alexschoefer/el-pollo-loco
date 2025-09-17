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
        this.collisionHandler = new Collision(this);
        this.setWorld();
        this.draw();
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
                this.canvas.classList.add('fullscreen');
                this.resizeCanvas();
            } else {
                this.canvas.classList.remove('fullscreen');
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
            this.collisionHandler.checkAll();
            this.checkThrowObjects();
            this.checkGameOver();
        }, 200);
    }

    /**
     * Removes an item (bottle or coin) from map
     * @param {*} arrayName - coin or bottle
     * @param {*} item - coin or bottle
     */
    removeFromMap(arrayName, item) {
        this.level[arrayName] = this.level[arrayName].filter(e => e !== item);
    }

    /**
     * Removes a dead enemy from map
     * @param {*} enemy - Smallchicken or chicken
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
            const isThrowLeft = this.character.otherDirection === true;
            const offsetX = isThrowLeft ? -20 : 100;
            const bottle = new ThrowableObject(
                this.character.x + offsetX,
                this.character.y + 150,
                this.audioManager,
                isThrowLeft
            );
            this.throwableObjects.push(bottle);
            this.bottleCollection.pop();
            this.updateBottleStatusbar();
        }
    }

    /**
     * Renders the entire game world on the canvas.
     */
    draw() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character, this.height);
        this.addToMap(this.endboss, this.height);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap([this.statusbarHealth]);
        this.addObjectsToMap([this.statusbarCoins]);
        this.addObjectsToMap([this.statusbarBottles]);
        this.addObjectsToMap([this.statusbarEndboss]);
        if (this.endScreen && this.endScreen.visible) {
            this.endScreen.draw(this.ctx);
        }
        this.animationFrameId = requestAnimationFrame(() => this.draw());
        this.drawSoundIcon();
        this.drawFullscreenIcon();
    }

    /**
     * Draws the sound icon in the top-right corner of the canvas.
     * */
    drawSoundIcon() {
        if (!this.soundIconLoaded) return;
        const iconSize = 40;
        const padding = 60;
        const x = this.canvas.width - iconSize - padding;
        const y = padding;
        this.soundIconBounds = { x, y, width: iconSize, height: iconSize };
        this.ctx.drawImage(this.soundIcon, x, y, iconSize, iconSize);
    }

    /**
     * Draws the fullscreen toggle icon in the bottom-right corner of the canvas.
     */
    drawFullscreenIcon() {
        if (!this.fullscreenIconLoaded) return;
        const iconSize = 30;
        const padding = 50;
        const x = this.canvas.width - iconSize - padding;
        const y = this.canvas.height - padding;
        this.fullscreenIconBounds = { x, y, width: iconSize, height: iconSize };
        this.ctx.drawImage(this.fullscreenIcon, x, y, iconSize, iconSize);
    }

    /**
     * Adds an array of drawable objects to the canvas.
     * @param {*} objects - An array of drawable game objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single drawable object to the canvas, applying image flipping if needed.
     * @param {*} mo - A drawable game object.
     */
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

    /**
     * Flips a drawable object's image horizontally for rendering.
     * @param {Object} mo - The game object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original orientation of a flipped game object.
     * @param {Object} mo - The game object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks if the game has ended due to character or endboss death.
     */
    checkGameOver() {
        if (this.character.isDead()) {
            this.endScreen = new Endscreen(Endscreen.IMAGE_GAMEOVER);
            this.endScreen.show();
            this.gameIsOver = true;
            this.stopEnemies();
            this.showEndscreenButtons();
            this.audioManager.stopAllSounds();
            document.getElementById('mobile-buttons')?.classList.add('d_none');
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
            document.getElementById('mobile-buttons')?.classList.add('d_none');
            if (!this.audioManager.isMuted) {
                this.audioManager.play('win');
            }
        }
    }

    /**
     * Updates the bottle status bar based on how many bottles have been collected.
     */
    updateBottleStatusbar() {
        const percentage = Math.min(
            (this.bottleCollection.length / this.level.maxBottles) * 100,
            100
        );
        this.statusbarBottles.setPercentage(percentage);
    }

    /**
     * Resets the game world and UI to its initial state.
     */
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

    /**
     * Toggles sound on or off. Updates icon and saves setting to localStorage.
     */
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

    /**
     * Toggles fullscreen mode for the canvas. Updates icon and saves state to localStorage.
     */
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

    /**
     * Checks if given (x, y) coordinates are within the bounds of a UI element.
     * @param {number} x - The x-coordinate to check.
     * @param {number} y - The y-coordinate to check.
     * @param {{x: number, y: number, width: number, height: number}} bounds - The bounds of the element.
     * @returns {boolean} True if within bounds, false otherwise.
     */
    isWithinBounds(x, y, bounds) {
        return bounds && x >= bounds.x && x <= bounds.x + bounds.width &&
            y >= bounds.y && y <= bounds.y + bounds.height;
    }

    /**
     * Handles click events on the canvas.
     * @param {MouseEvent} event - The mouse click event.
     * @returns {void}
     */
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

    /**
     * Stops all enemies and the endboss by setting their speed to 0.
     */
    stopEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.speed = 0;
        });
        this.endboss.speed = 0;
    }

    /**
     * Displays the endscreen buttons
     */
    showEndscreenButtons() {
        const btnContainer = document.getElementById('btn-endscreen-container');
        btnContainer.classList.remove('d_none');
    }

    /**
     * Resizes the canvas on the window height and width
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}