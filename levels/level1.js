const coins = generateRandomCoins(4, 8);
const bottles = generateRandomBottles(3, 8);
const maxCoins = coins.length;

const level1 = new Level(
    [
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        new EndBoss()
    ],
    [
        new Cloud(),
        new Cloud()
    ],
    [
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
    ],
    bottles,
    coins,
    coins.length
)

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