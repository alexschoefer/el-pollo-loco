class EndBoss extends MoveableObject {
    energy = 100;
    height = 450;
    width = 350;
    y = 20;
    isAttacking = false;
    speed = 10;

    offset = {
        top: 80,
        bottom: 60,
        left: 20,
        right: 20
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
    ]

    IMAGES_DEAD_ENDBOSS = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    IMAGES_ATTACK_ENDBOSS = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_ALERT_ENDBOSS[0]);
        this.loadImages(this.IMAGES_ALERT_ENDBOSS);
        this.loadImages(this.IMAGES_HURT_ENDBOSS);
        this.loadImages(this.IMAGES_DEAD_ENDBOSS);
        this.loadImages(this.IMAGES_ATTACK_ENDBOSS);
        this.loadImages(this.IMAGES_WALK_ENDBOSS);
        this.x = 2000; //Positionierung der Endboss
        this.animateEndboss();
        this.speed = 2; // dauerhaft festgelegte Geschwindigkeit
        this.isMoving = false;
    }


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
            } else if (this.x !== lastX) {
                this.playAnimation(this.IMAGES_WALK_ENDBOSS);
            } else {
                this.playAnimation(this.IMAGES_ALERT_ENDBOSS);
            }

            lastX = this.x;
        }, 200);
    }

    attackEndboss() {
        this.isAttacking = true;
    }

    stopAttackEndboss() {
        this.isAttacking = false;
    }

    moveLeftEndboss() {
        if (this.isMoving) {
            this.otherDirection = false; // nach links → Spiegeln!
            this.x -= this.speed;
            console.log('Endboss läuft nach links');
        }
    }
    
    moveRightEndboss() {
        console.log('isMoving:', this.isMoving);
        if (this.isMoving) {
            this.otherDirection = true; // nach rechts → Nicht spiegeln
            this.x += this.speed;
            console.log('Endboss läuft nach rechts');
        }
    }

    stopMovement() {
        this.isMoving = false;
    }
} 