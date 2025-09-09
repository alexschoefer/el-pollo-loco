function createLevelExpert() {
    const coins = generateRandomCoins(5, 8);
    const bottles = generateRandomBottles(6, 8);
    const maxCoins = coins.length;
    const maxBottles = bottles.length;
    // 🐔 Chicken: ab X=600, alle 400px
    const chickens = generateEnemies(Chicken, 4, 400, 400);

    // 🐣 SmallChicken: ab X=3000, alle 300px
    const smallChickens = generateEnemies(SmallChicken, 5, 500, 300);

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

function generateRandomBottles(min, max) {
    let bottles = [];
    let count = Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < count; i++) {
        bottles.push(new Bottles());
    }
    return bottles;
}


function generateRandomCoins(min, max) {
    let coins = [];
    let count = Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < count; i++) {
        coins.push(new Coins());
    }
    return coins;
}