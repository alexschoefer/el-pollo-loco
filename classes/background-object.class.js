/**
 * Represents a static or scrolling background object in the game.
 */
class BackgroundObject extends MoveableObject {

    width = 720;

    height = 480;

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
