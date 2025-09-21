/**
 * Creates and returns a expert level instance with randomized enemies, coins, bottles, clouds, and background.
 * @returns {Level} The configured expert level.
 */
function createLevelExpert() {
    const coins = generateRandomCoins(5, 8);
    const bottles = generateRandomBottles(10, 12);
    const maxCoins = coins.length;
    const maxBottles = bottles.length;
    const chickenStartX = 450 + Math.floor(Math.random() * 200);
    const smallChickenStartX = 500 + Math.floor(Math.random() * 300); 

    const chickens = generateEnemies(Chicken, 4, chickenStartX, 350, 500);
    const smallChickens = generateEnemies(SmallChicken, 5, smallChickenStartX, 300, 450);

    const enemies = [...chickens, ...smallChickens];
    const clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ];


    const backgroundObjects = [
        new BackgroundObject('assets/img/5_background/layers/air.png', -720),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -720),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -720),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -720),

        new BackgroundObject('assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * 2),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 720 * 2),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 720 * 2),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 720 * 2),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * 3),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720 * 3),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720 * 3),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720 * 3),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * 4),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 720 * 4),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 720 * 4),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 720 * 4),

        new BackgroundObject('assets/img/5_background/layers/air.png', 720 * 5),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 720 * 5),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 720 * 5),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 720 * 5),
    ];
    const endboss = new EndBoss(); 
    return new Level(
        enemies,
        clouds,
        backgroundObjects,
        bottles,
        coins,
        maxCoins,
        maxBottles,
        endboss
    );
}

/**
 * Generates a random number of bottle objects between the given min and max values.
 *
 * @param {number} min - Minimum number of bottles to generate.
 * @param {number} max - Maximum number of bottles to generate.
 * @returns {Bottles[]} An array of randomly generated bottle objects.
 */
function generateRandomBottles(min, max) {
    const bottles = [];
    const count = Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < count; i++) {
        bottles.push(new Bottles());
    }
    return bottles;
}

/**
 * Generates a random number of coin objects between the given min and max values.
 *
 * @param {number} min - Minimum number of coins to generate.
 * @param {number} max - Maximum number of coins to generate.
 * @returns {Coins[]} An array of randomly generated coin objects.
 */
function generateRandomCoins(min, max) {
    const coins = [];
    const count = Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < count; i++) {
        coins.push(new Coins());
    }
    return coins;
}