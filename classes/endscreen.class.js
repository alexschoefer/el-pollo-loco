class Endscreen extends DrawableObject {
    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.visible = false;

        this.width = 320;  
        this.height = 300; 

        // Statische Position, Mitte im Canvas 720x480
        this.x = (720 - this.width) / 2;  
        this.y = (480 - this.height) / 2;
    }

    IMAGE_GAMEOVER = [
        'assets/img/You won, you lost/Game Over.png'
    ];

    IMAGE_WIN = [
        'assets/img/You won, you lost/You win B.png'
    ];

    show() {
        this.visible = true;
    }

    draw(ctx) {
        if (this.visible) {
            super.draw(ctx);
        }
    }
}
