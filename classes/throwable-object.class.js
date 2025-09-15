/**
 * Class representing a throwable bottle object.
 * Extends MoveableObject to inherit movement and physics behavior.
 */
class ThrowableObject extends MoveableObject {

    /**
     * Manages audio playback for the throwable object.
     * @type {AudioManager}
     */
    audioManager;

    /**
     * Indicates whether the bottle has splashed.
     * @type {boolean}
     */
    hasSplashed = false;

    /**
     * Image paths for the bottle's throwing animation frames.
     * @type {string[]}
     */
    IMAGES_BOTTLES_THROWING = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Image paths for the bottle's splash animation frames.
     * @type {string[]}
     */
    IMAGES_BOTTLES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Creates a throwable bottle object at the specified position with an audio manager.
     * Loads all necessary images and starts the throw and animation processes.
     * 
     * @param {number} x - The initial horizontal position of the bottle.
     * @param {number} y - The initial vertical position of the bottle.
     * @param {AudioManager} audioManager - The audio manager to handle sound effects.
     */
    constructor(x, y, audioManager) {
        super();
        this.loadImages(this.IMAGES_BOTTLES_THROWING);
        this.loadImages(this.IMAGES_BOTTLES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.img = this.imageCache[this.IMAGES_BOTTLES_THROWING[0]];
        this.throwBottle();
        this.animateBottle();
        this.audioManager = audioManager;
    }

    /**
     * Initiates the bottle's throwing motion by setting vertical speed and applying gravity.
     * Moves the bottle horizontally to the right at a fixed interval.
     */
    throwBottle() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 50);
    }

    /**
     * Controls the animation of the bottle.
     * Plays the throwing animation until the bottle splashes,
     * then plays the splash animation and plays the throw sound once.
     */
    animateBottle() {
        let soundPlayed = false;

        setInterval(() => {
            if (this.hasSplashed) {
                this.playAnimation(this.IMAGES_BOTTLES_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_BOTTLES_THROWING);

                if (!soundPlayed) {
                    this.audioManager.play('throw');
                    soundPlayed = true;
                }
            }
        }, 100);
    }
}
