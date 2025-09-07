class ThrowableObject extends MoveableObject {

    hasSplashed = false;

    IMAGES_BOTTLES_THROWING = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_BOTTLES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_BOTTLES_THROWING);
        this.loadImages(this.IMAGES_BOTTLES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.img = this.imageCache[this.IMAGES_BOTTLES_THROWING[0]];
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
            if (this.hasSplashed) {
                this.playAnimation(this.IMAGES_BOTTLES_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_BOTTLES_THROWING);
            }
        }, 100);
    }
}