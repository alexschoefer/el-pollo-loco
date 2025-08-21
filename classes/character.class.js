class Character extends MoveableObject {
    height = 300;
    width = 150;
    y = 130;
    imagesCharacterWalking = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    
    constructor() {
        super().loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.imagesCharacterWalking);
        this.animateCharacter();
    }

    animateCharacter() {
        setInterval(() => {
            let indexImage = this.currentImage % this.imagesCharacterWalking.length;
            let path = this.imagesCharacterWalking[indexImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);


    }

    jump() {
    }

    attack() {

    }
}