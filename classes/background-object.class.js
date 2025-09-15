/**
 * Represents a static or scrolling background object in the game.
 */
class BackgroundObject extends MoveableObject {
    /** @type {number} The width of the background object. */
    width = 720;

    /** @type {number} The height of the background object. */
    height = 480;

    /**
     * Creates a new BackgroundObject instance.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - The horizontal position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;

        /**
         * Sets the vertical position so the object aligns with the bottom of the canvas.
         * @type {number}
         */
        this.y = 480 - this.height;
    }
}
