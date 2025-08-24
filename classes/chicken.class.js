class Chicken extends MoveableObject {
    y = 320;
    height = 100;
    width = 100;

    imagesWalking = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.imagesWalking);
        this.x = 200 + Math.random() * 500; //Positionierung der Chicken zwischen 200 und 700
        this.speed = 0.15 + Math.random()*0.25;
        this.animateEnemy();

    }

    animateEnemy() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 200);


    }
}