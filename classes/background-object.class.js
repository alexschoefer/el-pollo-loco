/**
 * Represents a static or scrolling background object in the game.
 */
class BackgroundObject extends MoveableObject {

    width = 720;

    height = 480;

    /**
     * Creates a new BackgroundObject and places it at a specified horizontal position. 
     * Loads the image and aligns the object vertically to the bottom of the canvas.
     * @param {string} imagePath - Path to the image file.
     * @param {number} x - Horizontal position (in pixels) where the background object should be placed.
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
