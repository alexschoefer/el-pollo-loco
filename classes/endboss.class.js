/**
 * Represents the final boss enemy in the game.
 */
class EndBoss extends MoveableObject {
    energy = 100;
    height = 450;
    width = 350;
    y = 20;
    isAttacking = false;
    speed = 10;
    hitsTaken = 0;
    isAggressive = false;
    attackLoopStarted = false;

    offset = {
        top: 90,
        bottom: 70,
        left: 30,
        right: 30
    };

    IMAGES_WALK_ENDBOSS = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

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

    IMAGES_HURT_ENDBOSS = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD_ENDBOSS = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

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
        this.x = 2100; 
        this.animateEndboss();
        this.speed = 5;
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
     * Applies damage to the boss if not currently invulnerable.
     * Triggers phase transitions based on current energy level and game difficulty.
     */
    hit() {
        const now = Date.now();
        const level = localStorage.getItem('selectedLevel');
        const invulnerable = level === 'expert' ? 800 : 1000;
    
        if (this.lastHit && now - this.lastHit < invulnerable) return;
    
        this.lastHit = now;
        this.energy = Math.max(0, this.energy - 20);
        this.hitsTaken++;
    
        this.handlePhaseActivation(90, 1);
        this.handlePhaseActivation(60, 2);
        if (level === 'expert') {
            this.handlePhaseActivation(30, 3);
        }
    }
    
    /**
     * Checks if the endboss energy has dropped below a threshold and activates the corresponding phase if not yet triggered.
     * 
     * @param {number} threshold - The energy value that triggers the phase.
     * @param {number} phase - The phase number to activate
     */
    handlePhaseActivation(threshold, phase) {
        if (this.energy <= threshold && !this[`phase${phase}`]) {
            this.becomeAggressive(phase);
            this[`phase${phase}`] = true;
        }
    }

    /**
     * Activates aggressive behavior for the boss depending on the current phase.
     * Adjusts speed, movement, and initiates attack loops as needed.
     * 
     * @param {number} phase - The phase of aggression to activate.
     */
    becomeAggressive(phase) {
        this.isAggressive = true;
        let selectedLevel = localStorage.getItem('selectedLevel');
        if (phase === 1) {
            this.speed = 10;
        } else if (phase === 2) {
            this.speed = 12;
        } else if (phase === 3 && selectedLevel === 'expert') {
            this.speed = 14;
            this.attackEndboss();
        }
    
        this.isMoving = true;

        if (!this.attackLoopStarted) {
            this.attackLoopStarted = true;
            this.startAttackingLoop();
        }
    
        if(selectedLevel === 'expert') {
            this.startAggressiveBehavior();
        }
    }
    
    /**
     * Starts a repeating attack loop for the boss.
     * Attacks the player every few seconds if aggressive and alive.
     */
    startAttackingLoop() {
        setInterval(() => {
            if (this.isAggressive && !this.isDead()) {
                this.attackPlayer();
            }
        }, 2000); 
    }

    /**
     * Triggers an attack animation and temporarily sets the boss into an attacking state.
     */
    attackPlayer() {
        this.attackEndboss();
        setTimeout(() => {
            this.stopAttackEndboss();
        }, 1000); 
    }

    /**
     * Begins interval-based behavior when the boss is aggressive.
     * Includes conditional dash or movement toward the player based on distance and randomness.
     */
    startAggressiveBehavior() {
        setInterval(() => {
            if (this.isDead() || !this.isAggressive) return;
            let selectedLevel = localStorage.getItem('selectedLevel');
            const positionCharacter = world.character.x; 
            const distance = Math.abs(this.x - positionCharacter);
            const closeEnough = distance < 300;

            if (closeEnough && Math.random() < 0.4 && selectedLevel === 'beginner') {
                this.performDashAttack(positionCharacter);
            } else if(closeEnough && Math.random() < 0.2 && selectedLevel === 'expert') {
                this.moveTowardsPlayer(positionCharacter);
            }
        }, 1200); 
    }

    /**
     * Moves the boss toward the player's current position.
     * 
     * @param {number} positionCharacter - The X-coordinate of the player.
     */
    moveTowardsPlayer(positionCharacter) {
        if (this.x > positionCharacter) {
            this.moveLeftEndboss();
        } else {
            this.moveRightEndboss();
        }
    }
    
    /**
     * Executes a short dash attack toward the player's position.
     * Temporarily disables further dashing until cooldown is complete.
     * 
     * @param {number} positionCharacter - The X-coordinate of the player.
     */
    performDashAttack(positionCharacter) {
        if (!this.canDash || this.isDead()) return;
    
        this.canDash = false;
        this.attackEndboss();
    
        const dashDistance = 100;
    
        if (this.x > positionCharacter) {
            this.x -= dashDistance;
        } else {
            this.x += dashDistance;
        }
    
        setTimeout(() => {
            this.stopAttackEndboss();
        }, 500);
    
        setTimeout(() => {
            this.canDash = true;
        }, this.dashCooldown);
    }  
}


