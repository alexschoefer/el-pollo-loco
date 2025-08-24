class Bottles extends DrawableObject {
    y = 340;
    x = 100;
    height = 80;
    width = 80;

    offset = {
        top: 10,
        bottom: 5,
        left: 10,
        right: 10
    };

    IMAGES_BOTTLES = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super(); 
        this.loadImage(this.getRandomBottleImages());
        this.setRandomBottlePosition();
    }

    getRandomBottleImages() {
        let randomBottleImage = Math.floor(Math.random() * 2);
        return this.IMAGES_BOTTLES[randomBottleImage];  
    }

    setRandomBottlePosition() {
        this.x = Math.random() * 2200 + 200;
    }
}