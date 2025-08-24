class ThrowableObject extends MoveableObject {

       IMAGES_BOTTLES_THROWING = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_BOTTLES_THROWING);
        this.img = this.imageCache[this.IMAGES_BOTTLES_THROWING[0]];
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60; 
        this.throwBottle();
        this.animateBottle();
    }

    throwBottle() {
         this.speedY = 30;
         this.applyGravity();
         setInterval(() => {
            this.x += 10;
         }, 50);
    }

    animateBottle() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES_THROWING);
        }, 100);
    }
}