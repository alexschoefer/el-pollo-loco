/**
 * Represents the main character (Pepe) in the game.
 * Handles movement, animation, gravity, and sound playback.
 * Inherits from MoveableObject.
 */
class Character extends MoveableObject {
    /** @type {AudioManager} Handles all sound effects and background audio. */
    audioManager;

    /** @type {number} Character height in pixels. */
    height = 300;

    /** @type {number} Character width in pixels. */
    width = 150;

    /** @type {number} Vertical position of the character on the canvas. */
    y = 135;

    /** @type {number} Movement speed of the character. */
    speed = 10;

    /** @type {boolean} Whether the character is in sleep/idle animation. */
    isSleeping = false;

    /**
     * Collision offset values for accurate hit detection.
     * @type {{ top: number, bottom: number, left: number, right: number }}
     */
    offset = {
        top: 100,
        bottom: 20,
        left: 30,
        right: 30
    };

    /** @type {string[]} Image paths for walking animation. */
    IMAGES_WALKING_CHARACTER = [/*...*/];

    /** @type {string[]} Image paths for jumping animation. */
    IMAGES_JUMPING_CHARACTER = [/*...*/];

    /** @type {string[]} Image paths for dead animation. */
    IMAGES_DEAD_CHARACTER = [/*...*/];

    /** @type {string[]} Image paths for hurt animation. */
    IMAGES_HURT_CHARACTER = [/*...*/];

    /** @type {string[]} Image paths for idle animation. */
    IMAGES_IDLE_CHARACTER = [/*...*/];

    /** @type {string[]} Image paths for long idle (sleep) animation. */
    IMAGES_LONG_IDLE_CHARACTER = [/*...*/];

    /** @type {World} Reference to the game world context. */
    world;

    /**
     * Constructs the character, initializes animations, loads images,
     * applies gravity, and starts animation loops.
     * 
     * @param {AudioManager} audioManager - Handles sound playback.
     */
    constructor(audioManager) {
        super().loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING_CHARACTER);
        this.loadImages(this.IMAGES_JUMPING_CHARACTER);
        this.loadImages(this.IMAGES_DEAD_CHARACTER);
        this.loadImages(this.IMAGES_HURT_CHARACTER);
        this.loadImages(this.IMAGES_IDLE_CHARACTER);
        this.loadImages(this.IMAGES_LONG_IDLE_CHARACTER);
        this.applyGravity();
        this.animateCharacter();
        this.audioManager = audioManager;
    }

    /**
     * Starts all character animation intervals:
     * - Movement & jumping (60 FPS)
     * - Animation frame cycling (20 FPS)
     * - Idle detection and sleep state
     */
    animateCharacter() {
        // Movement and camera update logic (60 FPS)
        setInterval(() => {
            if ((this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) ||
                (this.world.keyboard.LEFT && this.x > 0)) {
                if (this.world.keyboard.RIGHT) {
                    this.moveRight();
                    this.otherDirection = false;
                } else {
                    this.moveLeft();
                    this.otherDirection = true;
                }
                this.startWalkSound();
            } else {
                this.stopWalkSound();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.audioManager.play('jump');
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        // Animation image cycling (20 FPS)
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD_CHARACTER);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT_CHARACTER);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING_CHARACTER);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING_CHARACTER);
            } else if (this.isSleeping) {
                this.playAnimation(this.IMAGES_LONG_IDLE_CHARACTER);
                this.startSnoreSound();
            } else {
                this.playAnimation(this.IMAGES_IDLE_CHARACTER);
            }
        }, 50);

        // Idle/sleep state detection
        setInterval(() => {
            if (this.x !== this.lastX) {
                this.lastIdleTime = new Date().getTime();
                this.isSleeping = false;
                this.lastX = this.x;
                this.stopSnoreSound();
            } else {
                let now = new Date().getTime();
                let sleepingTime = now - this.lastIdleTime;

                if (sleepingTime > 10000) {
                    this.isSleeping = true;
                }
            }
        }, 200);
    }

    /**
     * Plays the walking sound if it is not already playing.
     */
    startWalkSound() {
        if (this.audioManager.isMuted) return;

        const sound = this.audioManager.sounds['walk'];
        if (sound && sound.paused) {
            sound.loop = true;
            sound.play();
        }
    }

    /**
     * Stops and resets the walking sound.
     */
    stopWalkSound() {
        const sound = this.audioManager.sounds['walk'];
        if (sound && !sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /**
     * Starts the snoring sound when the character is idle/sleeping.
     */
    startSnoreSound() {
        const snoreSound = this.audioManager.sounds['snore'];
        if (snoreSound && snoreSound.paused && !this.audioManager.isMuted) {
            snoreSound.currentTime = 0;
            snoreSound.play();
        }
    }

    /**
     * Stops and resets the snoring sound.
     */
    stopSnoreSound() {
        const snoreSound = this.audioManager.sounds['snore'];
        if (snoreSound && !snoreSound.paused) {
            snoreSound.pause();
            snoreSound.currentTime = 0;
        }
    }
}
