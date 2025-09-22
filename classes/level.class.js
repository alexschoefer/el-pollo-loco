class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2800;
    endboss; 

    /**
     * Creates the level for game with the given parameters of enemys, bottles, coins and the endboss
     * @param {*} enemies 
     * @param {*} clouds 
     * @param {*} backgroundObjects 
     * @param {*} bottles 
     * @param {*} coins 
     * @param {*} maxCoins 
     * @param {*} maxBottles 
     * @param {*} endboss 
     */
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