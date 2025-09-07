class Endscreen extends DrawableObject {
    static IMAGE_GAMEOVER = 'assets/img/You won, you lost/Game Over.png';
    static IMAGE_WIN = 'assets/img/You won, you lost/You win B.png';

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

    show() {
        this.visible = true;
    }

    draw(ctx) {
        if (this.visible) {
            super.draw(ctx);
        }
    }
}
