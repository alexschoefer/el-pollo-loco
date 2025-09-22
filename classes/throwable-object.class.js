class ThrowableObject extends MoveableObject {
    hasSplashed = false;

    IMAGES_BOTTLES_THROWING = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Creates a new throwable bottle object and initializes its motion, images, and animation.
     * @param {number} x
     * @param {number} y
     * @param {AudioManager} audioManager
     * @param {boolean} throwLeft
     */
    constructor(x, y, audioManager, throwLeft = false) {
        super();
        this.loadImages(this.IMAGES_BOTTLES_THROWING);
        this.loadImages(this.IMAGES_BOTTLES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.img = this.imageCache[this.IMAGES_BOTTLES_THROWING[0]];
        this.audioManager = audioManager;
        this.speedX = throwLeft ? -10 : 10;
        this.speedY = 25;
        this.hasHitEndboss = false;
        this.applyGravity();
        this.animateBottle();
    }

    /**
     * Applies gravity to the object over time by starting a fixed interval.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
            }
            this.speedY -= this.acceleration;
            if (this.speedX) {
                this.x += this.speedX;
            }
        }, 1000 / 25);
    }

    /**
     * Initiates a bottle throw by setting vertical and horizontal speed
     */
    throwBottle() {
        this.speedY = 25;
        this.speedX = 10 * this.direction;
        this.applyGravity();
    }

    /**
     * Animates the bottle's throw and splash sequence frame by frame.
     */
    animateBottle() {
        let frameIndex = 0, soundPlayed = false;
        let images = this.IMAGES_BOTTLES_THROWING;
        let lastTime = Date.now();
        const animate = () => {
            if (Date.now() - lastTime < 100) return this.animationId = requestAnimationFrame(animate);
            lastTime = Date.now();
            this.updateBottleImage(images, frameIndex);
            if (this.hasSplashed) {
                images = this.IMAGES_BOTTLES_SPLASH;
                if (frameIndex++ >= images.length - 1) return this.stopBottleAnimation();
            } else {
                frameIndex = (frameIndex + 1) % images.length;
                if (!soundPlayed) audioManager.play('throw'), soundPlayed = true;
            }
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }

    /**
     * Displays the bottle throw
     * @param {*} images 
     * @param {*} index 
     */
    updateBottleImage(images, index) {
        this.img = this.imageCache[images[index]];
    }
    
    /**
     * Stops the bottle Animation
     */
    stopBottleAnimation() {
        clearInterval(this.moveInterval);
        cancelAnimationFrame(this.animationId);
    }
    

    /**
     * Call this method externally when bottle hits something (like ground or enemy)
     */
    splash() {
        if (this.hasSplashed) return;
        this.hasSplashed = true;
        this.speedY = 0;
        this.speed = 0;
    }
}
