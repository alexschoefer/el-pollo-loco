class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 135;
        }
        
    }

    jump() {
        this.speedY = 30;
    }

    moveLeft() {
        this.x -= this.speed;

    }

    moveRight() {
        this.x += this.speed;
    }

    playAnimation(images) {
        let indexImage = this.currentImage % images.length;
        let path = images[indexImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    //prüft ob eine Kollision vorliegt
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - this.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.right;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.lastHit = new Date().getTime();

    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; //Differenz in s
        return timepassed < 1;
    }
}