class MoveableObject {
    x=150;
    y=180;
    img;
    height=200;
    width=100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
    }

    moveLeft(){
        
    }
}