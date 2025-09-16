/**
 * Represents the end screen displayed after the game finishes.
 * Depending on the outcome, it can show a "You Win" or "Game Over" image.
 * Inherits from {@link DrawableObject}.
 */
class Endscreen extends DrawableObject {
    /**
     * Path to the "Game Over" image.
     * @type {string}
     */
    static IMAGE_GAMEOVER = 'assets/img/You won, you lost/Game Over.png';

    /**
     * Path to the "You Win" image.
     * @type {string}
     */
    static IMAGE_WIN = 'assets/img/You won, you lost/You win B.png';

    /**
     * Creates an instance of the Endscreen.
     * @param {string} imagePath - The path to the image to display (win or game over).
     */
    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.visible = false;

        if (imagePath === Endscreen.IMAGE_GAMEOVER) {
            this.width = 320;
            this.height = 300;
        } else if (imagePath === Endscreen.IMAGE_WIN) {
            this.width = 300;
            this.height = 150;
        }

        this.x = (720 - this.width) / 2;
        this.y = (480 - this.height) / 2;
    }

    /**
     * Makes the endscreen visible so it will be drawn.
     */
    show() {
        this.visible = true;
    }

    /**
     * Draws the endscreen image on the canvas, if visible.
     * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
     */
    draw(ctx) {
        if (this.visible) {
            super.draw(ctx);
        }
    }
}
