class SmallChicken extends MoveableObject {
    y = 350;
    width = 70;
    height = 70;
    energy = 1;
    isDead = false;

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

    IMAGE_DEAD_SMALLCHICKEN = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png' 
    ]

    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING_SMALLCHICKEN);
        this.loadImages(this.IMAGE_DEAD_SMALLCHICKEN);
        this.speed = 0.10 + Math.random() * 0.25;
        this.animateEnemy();

    }

    animateEnemy() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if(this.isDead) {
                this.playAnimation(this.IMAGE_DEAD_SMALLCHICKEN);
            }else {
                this.playAnimation(this.IMAGES_WALKING_SMALLCHICKEN);
            }
        }, 200);



    }
}