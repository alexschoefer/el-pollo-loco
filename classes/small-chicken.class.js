class SmallChicken extends MoveableObject {
    y = 350;
    width = 80;
    height = 80;

    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    };

    IMAGES_WALKING_SMALLCHICKEN = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    IMAGES_DEAD_SMALLCHICKEN = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png' 
    ]

    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING_SMALLCHICKEN);
        this.loadImage('assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        this.x = 550 + Math.random() * 500; //Positionierung der Chicken zwischen 200 und 700
        this.speed = 0.15 + Math.random()*0.25;
        this.animateEnemy();

    }

    animateEnemy() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING_SMALLCHICKEN);
        }, 200);


    }
}