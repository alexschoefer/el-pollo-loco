/**
 * Represents a collectible coin in the game world.
 * Inherits from DrawableObject and spawns at a random position with a random image.
 */
class Coins extends DrawableObject {

    x = 200;
    y;

    height = 150;

    width = 150;

    offset = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
    };

    IMAGES_COINS = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ];

    /**
     * Creates a new coin instance with a random position and image.
     */
    constructor() {
        super();
        this.loadImage(this.getRandomCoinImages());
        this.setRandomCoinPosition();
    }

    /**
     * Selects a random coin image from the available image paths.
     * @returns {string} A randomly selected coin image path.
     */
    getRandomCoinImages() {
        let randomCoinImage = Math.floor(Math.random() * 2);
        return this.IMAGES_COINS[randomCoinImage];
    }

    /**
     * Sets a random position for the coin within the game world.
     * X is between 200 and 1800, Y is between 80 and 180.
     */
    setRandomCoinPosition() {
        this.x = Math.floor(Math.random() * 1600 + 200);
        this.y = Math.floor(Math.random() * 100 + 80);
    }
}
