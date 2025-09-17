/**
 * Represents the final boss enemy in the game.
 */
class EndBoss extends MoveableObject {
    /** @type {number} The current energy/health of the boss. */
    energy = 100;

    /** @type {number} The height of the boss sprite. */
    height = 450;

    /** @type {number} The width of the boss sprite. */
    width = 350;

    /** @type {number} The vertical position of the boss. */
    y = 20;

    /** @type {boolean} Whether the boss is currently attacking. */
    isAttacking = false;

    /** @type {number} Movement speed of the boss. */
    speed = 10;

    /** @type {number} Wie viele Treffer hat der Boss schon bekommen? */
    hitsTaken = 0;

    /** @type {boolean} Ist der Boss im aggressiven Modus? */
    isAggressive = false;

    /** 
     * @type {{ top: number, bottom: number, left: number, right: number }} 
     * Collision offset values for the boss.
     */
    offset = {
        top: 90,
        bottom: 70,
        left: 30,
        right: 30
    };

    /** @type {string[]} Walking animation images. */
    IMAGES_WALK_ENDBOSS = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /** @type {string[]} Alert (idle) animation images. */
    IMAGES_ALERT_ENDBOSS = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    /** @type {string[]} Hurt animation images. */
    IMAGES_HURT_ENDBOSS = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /** @type {string[]} Death animation images. */
    IMAGES_DEAD_ENDBOSS = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /** @type {string[]} Attack animation images. */
    IMAGES_ATTACK_ENDBOSS = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Creates an instance of the EndBoss and initializes its animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT_ENDBOSS[0]);
        this.loadImages(this.IMAGES_ALERT_ENDBOSS);
        this.loadImages(this.IMAGES_HURT_ENDBOSS);
        this.loadImages(this.IMAGES_DEAD_ENDBOSS);
        this.loadImages(this.IMAGES_ATTACK_ENDBOSS);
        this.loadImages(this.IMAGES_WALK_ENDBOSS);
        this.x = 2000; // Initial position off-screen
        this.animateEndboss();
        this.speed = 2;
        this.isMoving = false;
    }

    /**
     * Handles the animation logic depending on the boss's state (idle, walking, attacking, hurt, dead).
     */
    animateEndboss() {
        let lastX = this.x;

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD_ENDBOSS);
                this.speed = 0;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT_ENDBOSS);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK_ENDBOSS);
            } else if (this.x !== lastX && !this.isAttacking) {
                this.playAnimation(this.IMAGES_WALK_ENDBOSS);
            } else {
                this.playAnimation(this.IMAGES_ALERT_ENDBOSS);
            }

            lastX = this.x;
        }, 200);
    }

    /**
     * Sets the EndBoss into attacking state.
     */
    attackEndboss() {
        this.isAttacking = true;
    }

    /**
     * Stops the EndBoss's attacking state.
     */
    stopAttackEndboss() {
        this.isAttacking = false;
    }

    /**
     * Moves the EndBoss to the left if movement is enabled.
     */
    moveLeftEndboss() {
        if (this.isMoving) {
            this.otherDirection = false;
            this.x -= this.speed;
        }
    }

    /**
     * Moves the EndBoss to the right if movement is enabled.
     */
    moveRightEndboss() {
        if (this.isMoving) {
            this.otherDirection = true;
            this.x += this.speed;
        }
    }

    /**
     * Stops all movement of the EndBoss.
     */
    stopMovement() {
        this.isMoving = false;
    }

    /**
     * Applies damage to the EndBoss and updates its energy.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) this.energy = 0;
    
        this.hitsTaken++;
    
        if (this.hitsTaken >= 2) {
            this.becomeAggressive();
        }
    
        this.lastHit = new Date().getTime();
    }

    becomeAggressive() {
        if (!this.isAggressive) {
            this.isAggressive = true;
            this.speed = 15; 
            this.isMoving = true;
        }
    }
}
