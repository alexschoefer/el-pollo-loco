class Chicken extends MoveableObject {
    y = 320;
    height = 100;
    width = 100;
    isDead = false;
    energy = 1;

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };

    IMAGES_WALKING_CHICKEN = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD_CHICKEN = [
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING_CHICKEN);
        this.loadImages(this.IMAGE_DEAD_CHICKEN);
        // this.x = (420 + Math.random() * 500); //Positionierung der Chicken zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25;
        this.animateEnemy();
    }

    animateEnemy() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if(this.isDead) {
                this.playAnimation(this.IMAGE_DEAD_CHICKEN);
            }else {
                this.playAnimation(this.IMAGES_WALKING_CHICKEN);
            }
        }, 200);
    }
}