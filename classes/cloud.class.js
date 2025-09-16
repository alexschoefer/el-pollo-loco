/**
 * Represents a moving cloud in the game's background.
 * Inherits from MoveableObject and handles randomized positioning and continuous movement.
 */
class Cloud extends MoveableObject {
    /** @type {number} Vertical position of the cloud on the canvas. */
    y = 20;

    /** @type {number} Width of the cloud image. */
    width = 500;

    /** @type {number} Height of the cloud image. */
    height = 250;

    /** @type {string[]} Available cloud image paths. */
    IMAGES_CLOUD = [
        'assets/img/5_background/layers/4_clouds/1.png',
        'assets/img/5_background/layers/4_clouds/2.png'
    ];

    /**
     * Constructs a Cloud instance with a random horizontal position,
     * loads an initial image, and starts animation.
     */
    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.setRandomCloudPosition();
        this.animateClouds();
    }

    /**
     * Returns a random image path from the available cloud images.
     * @returns {string} Path to a randomly selected cloud image.
     */
    getRandomCloudImages() {
        let randomCloudImage = Math.floor(Math.random() * 2);
        return this.IMAGES_CLOUD[randomCloudImage];  
    }

    /**
     * Sets a random horizontal position for the cloud on the canvas.
     */
    setRandomCloudPosition() {
        this.x = Math.floor(Math.random() * 2000);
    }

    /**
     * Continuously moves the cloud to the left at a fixed interval (every 60ms).
     */
    animateClouds() {
        setInterval(() => {
            this.moveLeft();
        }, 60);
    }
}
