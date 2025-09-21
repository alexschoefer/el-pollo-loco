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
     * @param {number} x
     * @param {number} y
     * @param {AudioManager} audioManager
     * @param {boolean} throwLeft
     */
    constructor(x, y, throwLeft = false) {
        super();
        this.loadImages(this.IMAGES_BOTTLES_THROWING);
        this.loadImages(this.IMAGES_BOTTLES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.img = this.imageCache[this.IMAGES_BOTTLES_THROWING[0]];
        this.audioManager = audioManager;
        this.direction = throwLeft ? -1 : 1;
        this.hasHitEndboss = false;
        this.throwBottle();
        this.animateBottle();
    }

    throwBottle() {
        this.speedY = 25;
        this.applyGravity();
        this.moveInterval = setInterval(() => {
            this.x += 10 * this.direction;
        }, 50);
    }

    animateBottle() {
        let soundPlayed = false;
        let frameIndex = 0;
        let animationImages = this.IMAGES_BOTTLES_THROWING;
    
        const frameDuration = 100; 
        let lastFrameTime = Date.now();
    
        const animate = () => {
            const now = Date.now();
            if (now - lastFrameTime >= frameDuration) {
                lastFrameTime = now;
    
                if (this.hasSplashed) {
                    animationImages = this.IMAGES_BOTTLES_SPLASH;
    
                    if (frameIndex < animationImages.length - 1) {
                        this.img = this.imageCache[animationImages[frameIndex]];
                        frameIndex++;
                    } else {
                        this.img = this.imageCache[animationImages[animationImages.length - 1]];
                        cancelAnimationFrame(this.animationId);
                        clearInterval(this.moveInterval);
                        return;
                    }
                } else {
                    this.img = this.imageCache[animationImages[frameIndex]];
                    frameIndex = (frameIndex + 1) % animationImages.length;
    
                    if (!soundPlayed) {
                        audioManager.play('throw');
                        soundPlayed = true;
                    }
                }
            }
    
            this.animationId = requestAnimationFrame(animate);
        };
    
        animate();
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
