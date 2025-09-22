/**
 * Represents a movable object in the game, such as the player, enemies, or projectiles.
 * Extends DrawableObject to gain rendering capabilities.
 */
class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * Applies gravity to the object by updating its vertical position (`y`) and speed (`speedY`)
     * at regular intervals. Simulates falling or jumping.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            // Vertikale Bewegung
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
            }
            this.speedY -= this.acceleration;
    
            // Horizontale Bewegung (z. B. Flasche fliegt weiter)
            if (this.speedX) {
                this.x += this.speedX;
            }
        }, 1000 / 25);
    }
    
    

    /**
     * Checks whether the object is currently above the ground level.
     * @returns {boolean} True if the object is above ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 135;
        }
    }

    /**
     * Makes the object jump by setting an initial upward vertical speed (`speedY`).
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Moves the object left by reducing its horizontal position (`x`) by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves the object right by increasing its horizontal position (`x`) by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Plays a frame of the provided animation sequence.
     * @param {string[]} images - An array of image paths to be cycled through.
     */
    playAnimation(images) {
        let indexImage = this.currentImage % images.length;
        let path = images[indexImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Checks if this object is colliding with another moveable object.
     * 
     * @param {MoveableObject} mo - The other object to check collision with.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the object's energy by 5 and records the time it was hit.
     */
    hit(damage = 10) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.lastHit = new Date().getTime();
        if (this.energy === 0 && this.world && !this.world.gameIsOver) {
            this.world.checkGameOver();
        }
    }

    /**
     * Checks if the object is dead
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Checks if the object was hit within the last second.
     * @returns {boolean} True if the object is currently considered hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Determines whether the character is falling on top of an enemy.
     * @param {MoveableObject} mo - The enemy object to check against.
     * @returns {boolean} True if the character is falling onto the enemy, false otherwise.
     */
    isCharacterFallingOnEnemy(mo) {
        if (mo.isDead) return false;
        const isFalling = this.speedY < 0;
        if (!isFalling) return false;
        const hitboxPadding = 10;
        const feet = this.y + this.height;
        const verticalOverlap =
            feet > mo.y &&
            feet < mo.y + mo.height + hitboxPadding;
        const horizontalOverlap =
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;

        return verticalOverlap && horizontalOverlap;
    }
}
