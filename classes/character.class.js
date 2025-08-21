class Character extends MoveableObject {
    height = 300;
    width = 150;
    y = 130;
    speed = 10;
    imagesCharacterWalking = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    world;

    constructor() {
        super().loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.imagesCharacterWalking);
        this.animateCharacter();
    }

    animateCharacter() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }

        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                //Walk animation
                let indexImage = this.currentImage % this.imagesCharacterWalking.length;
                let path = this.imagesCharacterWalking[indexImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);

    }

    jump() {
    }

    attack() {

    }
}