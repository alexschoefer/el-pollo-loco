class Character extends MoveableObject {
    audioManager;
    height = 300;
    width = 150;
    y = 135;
    speed = 10;
    isSleeping = false;

    offset = {
        top: 100,
        bottom: 20,
        left: 30,
        right: 30
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
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];

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
    ]

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
    ]

    world;

    /**
     * Creates a new Character instance and initializes animations and sounds.
     * @param {AudioManager} audioManager - Manages character sound effects.
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
     * Handles character animation and behavior based on input and state.
     * Starts movement and animation intervals including walking, jumping, idle, and sleeping logic.
     */
    animateCharacter() {
        setInterval(() => {
            if (this.world.gameIsOver) {
                this.stopWalkSound();
                return;  // keine Bewegungen mehr erlauben
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
        
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.audioManager.play('jump');
            }
        
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        

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
     * Starts the walking sound if it's not already playing.
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
     * Stops the walking sound if it is currently playing.
     */
    stopWalkSound() {
        const sound = this.audioManager.sounds['walk'];
        if (sound && !sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /**
     * Plays the snoring sound while the character is sleeping (long idle).
     */
    startSnoreSound() {
        const snoreSound = this.audioManager.sounds['snore'];
        if (snoreSound && snoreSound.paused && !this.audioManager.isMuted) {
            snoreSound.currentTime = 0;
            snoreSound.play();
        }
    }

    /**
     * Stops the snoring sound if it is currently playing.
     */
    stopSnoreSound() {
        const snoreSound = this.audioManager.sounds['snore'];
        if (snoreSound && !snoreSound.paused) {
            snoreSound.pause();
            snoreSound.currentTime = 0;
        }
    }
}

