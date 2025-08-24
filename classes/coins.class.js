class Coins extends DrawableObject  {
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
    ]

    constructor() {
        super(); 
        this.loadImage(this.getRandomCoinImages());
        this.setRandomCoinPosition();
        console.log(`Coin created at x=${this.x}, y=${this.y}`);
    }

    getRandomCoinImages() {
        let randomCoinImage = Math.floor(Math.random() * 2);
        return this.IMAGES_COINS[randomCoinImage];  
    }

    setRandomCoinPosition() {
        this.x = Math.floor(Math.random() * 1800 + 200);
        this.y = Math.floor(Math.random() * 100 + 160);
    }
}
