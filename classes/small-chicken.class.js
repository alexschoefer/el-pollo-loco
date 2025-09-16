/**
 * Represents a small chicken enemy that moves left and animates walking or death.
 * Extends {@link MoveableObject}.
 */
class SmallChicken extends MoveableObject {
    /** Vertical position on the canvas */
    y = 350;

    /** Width of the chicken */
    width = 70;

    /** Height of the chicken */
    height = 70;

    /** Current energy level of the chicken (1 means alive) */
    energy = 1;

    /** Flag indicating whether the chicken is dead */
    isDead = false;

    /** Offset for collision detection or drawing adjustments */
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    };

    /** Array of image paths for walking animation */
    IMAGES_WALKING_SMALLCHICKEN = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /** Image path for the dead chicken */
    IMAGE_DEAD_SMALLCHICKEN = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png' 
    ];

    /**
     * Creates a new SmallChicken instance.
     * Initializes images, sets a random speed, and starts animation.
     */
    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING_SMALLCHICKEN);
        this.loadImages(this.IMAGE_DEAD_SMALLCHICKEN);
        this.speed = 0.10 + Math.random() * 0.25;
        this.animateEnemy();
    }

    /**
     * Starts the movement and animation loops.
     * Moves the chicken left continuously and plays the appropriate animation
     * based on whether the chicken is dead or alive.
     */
    animateEnemy() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGE_DEAD_SMALLCHICKEN);
            } else {
                this.playAnimation(this.IMAGES_WALKING_SMALLCHICKEN);
            }
        }, 200);
    }
}
