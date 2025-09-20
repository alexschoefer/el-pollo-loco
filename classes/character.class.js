class Character extends MoveableObject {
    audioManager;
    height = 300;
    width = 150;
    y = 135;
    speed = 10;
    isSleeping = false;
    isJumping = false;
    playedFallStart = false;
    fallFrameIndex = 0;
    fallFrameDelayCounter = 0;
    lastFallFrameTime = 0;  // Zeitpunkt des letzten Bildwechsels beim Fallen
    fallFrameDelay = 150;
    landingShown = false;
    landedAt = 0;

    offset = {
        top: 120,
        bottom: 20,
        left: 40,
        right: 40
    };

    IMAGES_WALKING_CHARACTER = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING_CHARACTER = [
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
    ];

    IMAGES_FALLING_CHARACTER = [
        "assets/img/2_character_pepe/3_jump/J-36.png",
        "assets/img/2_character_pepe/3_jump/J-37.png",
        "assets/img/2_character_pepe/3_jump/J-38.png",
        "assets/img/2_character_pepe/3_jump/J-39.png"
    ]

    IMAGES_DEAD_CHARACTER = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT_CHARACTER = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE_CHARACTER = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE_CHARACTER = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;

    constructor(audioManager) {
        super().loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING_CHARACTER);
        this.loadImages(this.IMAGES_JUMPING_CHARACTER);
        this.loadImages(this.IMAGES_FALLING_CHARACTER);
        this.loadImages(this.IMAGES_DEAD_CHARACTER);
        this.loadImages(this.IMAGES_HURT_CHARACTER);
        this.loadImages(this.IMAGES_IDLE_CHARACTER);
        this.loadImages(this.IMAGES_LONG_IDLE_CHARACTER);
        this.applyGravity();
        this.animateCharacter();
        this.audioManager = audioManager;
        this.energy = 100;
    }

    /**
     * Initializes and starts the character's animation logic.
     * Sets up intervals to handle movement, animation frames, and sleep detection.
     */
    animateCharacter() {
        setInterval(() => {
            this.moveCharacter();
        }, 1000 / 60);

        setInterval(() => {
            this.showImagesOfMovementCharacter();
        }, 100);

        setInterval(() => {
            this.checkIfCharacterSleeping();
        }, 200);
    }

    /**
     * Handles character movement based on keyboard input.
     * Moves character left or right, starts/stops walking sound, triggers jump logic,
     */
    moveCharacter() {
        this.isHoldingJump = this.world.keyboard.SPACE;
        if (this.world.gameIsOver) {
            this.stopWalkSound();
            return;
        }

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

        if (this.world.keyboard.SPACE && !this.isJumping && this.isOnGround()) {
            this.jump();
            this.audioManager.play('jump');
            this.isJumping = true;
            this.jumpAnimationFrame = 0;
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Displays the appropriate animation images based on the character's current state.
     * Handles dead, hurt, jumping, walking, idle, and sleeping animations.
     * Resets jump and sleep state if character lands on the ground.
     */
    showImagesOfMovementCharacter() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD_CHARACTER);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT_CHARACTER);
        } else if (this.isJumping || this.isAboveGround()) {
            this.updateJumpAnimation();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING_CHARACTER);
        } else if (this.isSleeping) {
            this.playAnimation(this.IMAGES_LONG_IDLE_CHARACTER);
            this.startSnoreSound();
        } else {
            this.playAnimation(this.IMAGES_IDLE_CHARACTER);
        }
    }

    isOnGround() {
        return !this.isAboveGround();
    }

    /**
     * Updates the jump animation based on the character's current vertical speed and state.
     * This method delegates to the various handle* methods for different jump phases.
     */
    updateJumpAnimation() {
        const now = Date.now();
        if (this.handleJumpStart()) return;
        if (this.handleJumpAscent()) return;
        if (this.handleFallStart(now)) return;
        if (this.handleFalling(now)) return;
        if (this.handleLandingAnimation(now)) return;
    }

    /**
     * Handles the start of a jump animation.
     * @returns {boolean} True if this frame was handled.
     */
    handleJumpStart() {
        if (this.justJumped) {
            this.playAnimation(["assets/img/2_character_pepe/3_jump/J-33.png"]);
            this.justJumped = false;
            return true;
        }
        return false;
    }

    /**
     * Handles the animation during the ascent phase of a jump.
     * @returns {boolean} True if this frame was handled.
     */
    handleJumpAscent() {
        const stillHoldingJump = this.isHoldingJump && this.isAboveGround();
        const rising = this.speedY > 0;

        if (rising || stillHoldingJump) {
            this.playAnimation(["assets/img/2_character_pepe/3_jump/J-34.png"]);
            return true;
        }
        return false;
    }

    /**
     * Handles the transition frame when the character starts to fall.
     * @param {number} now - The current timestamp.
     * @returns {boolean} True if this frame was handled.
     */
    handleFallStart(now) {
        if (this.speedY <= 0 && !this.playedFallStart) {
            this.playAnimation(["assets/img/2_character_pepe/3_jump/J-35.png"]);
            this.playedFallStart = true;
            this.fallFrameIndex = 0;
            this.lastFallFrameTime = now;
            return true;
        }
        return false;
    }

    /**
     * Handles the animation during the fall.
     * @param {number} now - The current timestamp.
     * @returns {boolean} True if this frame was handled.
     */
    handleFalling(now) {
        if (this.playedFallStart && this.isAboveGround()) {
            const fallImgs = [
                "assets/img/2_character_pepe/3_jump/J-36.png",
                "assets/img/2_character_pepe/3_jump/J-37.png"
            ];
            if (now - this.lastFallFrameTime > this.fallFrameDelay) {
                this.lastFallFrameTime = now;
                this.fallFrameIndex = (this.fallFrameIndex + 1) % fallImgs.length;
                this.img = this.imageCache[fallImgs[this.fallFrameIndex]];
            }
            return true;
        }
        return false;
    }

    /**
     * Handles the animation for landing after a jump or fall.
     * @param {number} now - The current timestamp.
     * @returns {boolean} True if this frame was handled.
     */
    handleLandingAnimation(now) {
        const j38 = "assets/img/2_character_pepe/3_jump/J-38.png";
        const j39 = "assets/img/2_character_pepe/3_jump/J-39.png";

        if (!this.isAboveGround() && this.playedFallStart && !this.landingShown) {
            this.landingShown = true;
            this.landedAt = now;
            this.playAnimation([j38]);
            return true;
        }

        if (this.landingShown && now - this.landedAt < 200) {
            this.playAnimation([j38]);
            return true;
        }

        if (this.landingShown && now - this.landedAt >= 200) {
            this.img = this.imageCache[j39];
            this.resetJumpState();
            return true;
        }
        return false;
    }

    /**
     * Resets all internal jump-related states and animation flags.
     * Called when the character has completed the landing animation.
     */
    resetJumpState() {
        this.isJumping = false;
        this.justJumped = false;
        this.playedFallStart = false;
        this.fallFrameIndex = 0;
        this.lastFallFrameTime = 0;
        this.landingShown = false;
        this.landedAt = 0;
        this.speedY = 0;
    }

    /**
    * Initiates the jump by applying vertical speed and setting appropriate flags.
    * Prevents jumping if already in a jump.
    */
    jump() {
        if (this.isJumping) return;
        super.jump();
        this.justJumped = true;
        this.isJumping = true;
        this.playedFallStart = false;
    }

    /**
     * Checks if the character has been idle for more than 10 seconds.
     * If so, sets the sleeping state to true.
     * Resets the sleep timer if the character has moved or jumped.
     */
    checkIfCharacterSleeping() {
        if (this.world.gameIsOver) {
            this.isSleeping = false;
            this.stopSnoreSound();
            return;
        }
        if (this.x !== this.lastX || this.isJumping) {
            this.lastIdleTime = new Date().getTime();
            this.isSleeping = false;
            this.lastX = this.x;
            this.stopSnoreSound();
        } else {
            const now = new Date().getTime();
            const sleepingTime = now - this.lastIdleTime;

            if (sleepingTime > 10000) {
                this.isSleeping = true;
            }
        }
    }

    /**
     * Starts the walking sound if it's not already playing and audio is not muted.
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
     * Stops the walking sound if it's currently playing.
     */
    stopWalkSound() {
        const sound = this.audioManager.sounds['walk'];
        if (sound && !sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /**
     * Plays the snore sound if the character is sleeping and audio is not muted.
     */
    startSnoreSound() {
        const snoreSound = this.audioManager.sounds['snore'];
        if (snoreSound && snoreSound.paused && !this.audioManager.isMuted) {
            snoreSound.currentTime = 0;
            snoreSound.play();
        }
    }

    /**
     * Stops the snore sound if it's currently playing.
     */
    stopSnoreSound() {
        const snoreSound = this.audioManager.sounds['snore'];
        if (snoreSound && !snoreSound.paused) {
            snoreSound.pause();
            snoreSound.currentTime = 0;
        }
    }

    /**
     * Determines whether the character is falling onto a given enemy.
     * @param {MoveableObject} mo - The enemy object to check collision against.
     * @returns {boolean} True if the character is falling onto the enemy, false otherwise.
     */
    isCharacterFallingOnEnemy(mo) {
        if (mo.isDead || this.speedY >= 0) return false;
        const feet = this.y + this.height;
        const vertical = feet > mo.y && feet < mo.y + mo.height + 10;
        const horizontal = (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right
        );
        return vertical && horizontal;
    }

    /**
     * Reduces the character's energy by 10 and handles game over logic if energy reaches zero.
     * Updates the health status bar.
     */
    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
            this.world.statusbarHealth.setPercentage(0);
            this.world.endScreen = new Endscreen(Endscreen.IMAGE_GAMEOVER);
            this.world.endScreen.show();
            this.world.gameIsOver = true;
            this.world.stopEnemies();
            this.world.showEndscreenButtons();
            this.world.audioManager.stopAllSounds();
            document.getElementById('mobile-buttons')?.classList.add('d_none');
            if (!this.world.audioManager.isMuted) {
                this.world.audioManager.play('gameover');
            }
        } else {
            this.world.statusbarHealth.setPercentage(this.energy);
        }
    }
}
