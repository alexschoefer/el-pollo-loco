/**
 * Represents a moving cloud in the game's background.
 * Inherits from MoveableObject and handles randomized positioning and continuous movement.
 */
class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 250;

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
