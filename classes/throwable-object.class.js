class ThrowableObject extends MoveableObject {

    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.throwBottle();
    }

    throwBottle() {
         this.speedY = 30;
         this.applyGravity();
         setInterval(() => {
            this.x += 10;
         }, 50);
    }
}