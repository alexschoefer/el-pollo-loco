/**
 * Represents a normal chicken enemy in the game.
 * Inherits from MoveableObject and manages movement, animation, and state (alive/dead).
 */
class Chicken extends MoveableObject {
    y = 320;
    height = 100;
    width = 100;
    isDead = false;
    energy = 1;
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };

    IMAGES_WALKING_CHICKEN = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

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
