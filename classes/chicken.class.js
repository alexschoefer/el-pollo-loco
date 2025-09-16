/**
 * Represents a normal chicken enemy in the game.
 * Inherits from MoveableObject and manages movement, animation, and state (alive/dead).
 */
class Chicken extends MoveableObject {
    /** @type {number} Vertical position of the chicken on the canvas. */
    y = 320;

    /** @type {number} Height of the chicken in pixels. */
    height = 100;

    /** @type {number} Width of the chicken in pixels. */
    width = 100;

    /** @type {boolean} Whether the chicken is dead. */
    isDead = false;

    /** @type {number} Health/energy level of the chicken. */
    energy = 1;

    /**
     * Collision offset values for accurate hit detection.
     * @type {{ top: number, bottom: number, left: number, right: number }}
     */
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };

    /** @type {string[]} Image paths for walking animation. */
    IMAGES_WALKING_CHICKEN = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /** @type {string[]} Image path for dead chicken. */
    IMAGE_DEAD_CHICKEN = [
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Constructs a new Chicken instance with randomized speed,
     * loads image assets and starts animation/movement.
     */
    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING_CHICKEN);
        this.loadImages(this.IMAGE_DEAD_CHICKEN);
        this.speed = 0.15 + Math.random() * 0.25; // Random movement speed
        this.animateEnemy();
    }

    /**
     * Starts movement and animation intervals:
     * - Moves left if not dead (60 FPS)
     * - Plays walking or dead animation depending on state (every 200ms)
     */
    animateEnemy() {
        // Movement interval
        this.moveInterval = setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        // Animation frame update
        this.animationInterval = setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGE_DEAD_CHICKEN);
            } else {
                this.playAnimation(this.IMAGES_WALKING_CHICKEN);
            }
        }, 200);
    }
}
