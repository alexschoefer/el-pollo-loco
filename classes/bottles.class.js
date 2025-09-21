/**
 * Represents a bottle collectible in the game world.
 * Bottles can be picked up or thrown by the player.
 */
class Bottles extends DrawableObject {

    y = 340;
    x = 100;
    height = 80;
    width = 60;
    bottleThrown = false;

    offset = {
        top: 15,
        bottom: 5,
        left: 20,
        right: 2
    };

    IMAGES_BOTTLES = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Constructs a new Bottles instance.
     * Randomly selects a bottle image and position.
     */
    constructor() {
        super(); 
        this.loadImage(this.getRandomBottleImages());
        this.setRandomBottlePosition();
    }

    /**
     * Returns a random bottle image path from the list.
     * @returns {string} Path to a random bottle image.
     */
    getRandomBottleImages() {
        let randomBottleImage = Math.floor(Math.random() * 2);
        return this.IMAGES_BOTTLES[randomBottleImage];  
    }

    /**
     * Sets a random X-position for the bottle within the level.
     */
    setRandomBottlePosition() {
        this.x = Math.random() * 1600 + 200;
    }
}
