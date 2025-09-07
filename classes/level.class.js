class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2800;
    endboss; 

    constructor(enemies,clouds,backgroundObjects, bottles = [], coins, maxCoins, maxBottles, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.maxCoins = maxCoins;
        this.maxBottles = maxBottles;
        this.endboss = endboss; 
    }
}