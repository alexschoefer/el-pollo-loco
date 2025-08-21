class Chicken extends MoveableObject {
    y = 320;
    height = 100;
    width = 100;

    imagesChickenWalkingBig = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.imagesChickenWalkingBig);
        this.x = 200 + Math.random() * 500; //Positionierung der Chicken zwischen 200 und 700
        this.speed = 0.15 + Math.random()*0.25;
        this.animateEnemy();

    }

    animateEnemy() {
        this.moveLeft();
        setInterval(() => {
            let indexImage = this.currentImage % this.imagesChickenWalkingBig.length;
            let path = this.imagesChickenWalkingBig[indexImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);


    }
}