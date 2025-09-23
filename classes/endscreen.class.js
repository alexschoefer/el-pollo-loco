/**
 * Represents the end screen displayed after the game finishes.
 */
class Endscreen extends DrawableObject {

    static IMAGE_GAMEOVER = 'assets/img/You won, you lost/Game Over.png';

    static IMAGE_WIN = 'assets/img/You won, you lost/You win B.png';
    
    /**
     * Creates the endscreen at the end of the game for losing or winning
     * @param {*} imagePath - path for show the correct endscreen
     */
    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.visible = false;

        if (imagePath === Endscreen.IMAGE_GAMEOVER) {
            this.width = 300;
            this.height = 250;
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
