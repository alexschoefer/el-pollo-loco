class MoveableObject {
    x = 150;
    y = 180;
    img;
    height = 200;
    width = 100;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })


    }

    moveRight() {
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        //Walk animation
        let indexImage = this.currentImage % this.imagesWalking.length;
        let path = this.imagesWalking[indexImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}