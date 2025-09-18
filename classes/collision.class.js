class Collision {
    constructor(world) {
        this.world = world;
        this.level = world.level;
        this.character = world.character;
        this.audioManager = world.audioManager;
        this.statusbarHealth = world.statusbarHealth;
        this.statusbarCoins = world.statusbarCoins;
        this.statusbarBottles = world.statusbarBottles;
        this.statusbarEndboss = world.statusbarEndboss;
        this.endboss = world.endboss;
        this.throwableObjects = world.throwableObjects;
        this.bottleCollection = world.bottleCollection;
        this.coinsCollection = world.coinsCollection;
    }

    /**
     * Checks different collisions of the objects in each separated
     */
    checkAll() {
        this.checkCollisionsChickens();
        this.checkCollisionsBottleCharacter();
        this.checkCollisionBottleEnemies();
        this.checkCollisionEndbossCharacter();
        this.checkEndbossDistanceToCharacter();
        this.checkCollisionCoins();
        this.checkCollisionEndboss();
    }

    /**
    * Checks collisions between the character and chickens (enemies).
    */
    checkCollisionsChickens() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isCharacterFallingOnEnemy(enemy) && !enemy.isDead) {
                enemy.energy = 0;
                enemy.isDead = true;
                enemy.speed = 0;
                this.audioManager.play('chickenHurt');
                this.world.removeDeadChickenFromMap(enemy);
                // this.character.speedY = -10;
            } else if (this.character.isColliding(enemy) && !enemy.isDead) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
                this.audioManager.play('hurt');
            }
        });
    }


    /**
    * Checks if the character picks up bottles from the level
    */
    checkCollisionsBottleCharacter() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleCollection.push(bottle);
                this.world.updateBottleStatusbar();
                this.audioManager.play('bottle');
                this.world.removeFromMap('bottles', bottle);
            }
        })
    }

    /**
    * Checks collisions between thrown bottles and enemies.
    */
    checkCollisionBottleEnemies() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle) && !enemy.isDead) {
                    enemy.isDead = true;
                    enemy.speed = 0;
                    this.audioManager.play('chickenHurt');
                    this.world.removeDeadChickenFromMap(enemy);
                    bottle.hasSplashed = true;
                }
            });
        });
    }

    /**
    * Checks collisions between character and endboss.
    */
    checkCollisionEndbossCharacter() {
        if (this.endboss.isColliding(this.character)) {
            this.character.hit();
            this.audioManager.play('hurt');
            this.audioManager.play('endbossAttack');
            this.statusbarHealth.setPercentage(this.character.energy);
            this.endboss.attackEndboss();
            this.endboss.moveLeftEndboss();
        } else {
            this.endboss.stopAttackEndboss();
        }
    }

    /**
    * Checks the distance between the character and the endboss.
    */
    checkEndbossDistanceToCharacter() {
        let distance = this.character.x - this.endboss.x;

        if (this.endboss.isAggressive || Math.abs(distance) < 450) {
            this.endboss.isMoving = true;

            if (distance > 0) {
                this.endboss.moveRightEndboss();
            } else {
                this.endboss.moveLeftEndboss();
            }
        } else {
            this.endboss.stopMovement();
        }
    }

    /**
    * Checks if the character picks up coins from the level
    */
    checkCollisionCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinsCollection.push(coin);
                this.statusbarCoins.setPercentage(Math.min(this.coinsCollection.length / this.level.maxCoins * 100, 100));
                this.audioManager.play('coin');
                this.world.removeFromMap('coins', coin);
            }
        })
    }

    /**
    * Checks if the endboss is hitting by bottles from the level
    */
    checkCollisionEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (!bottle.hasHitEndboss && this.endboss.isColliding(bottle)) {
                this.endboss.hit(); // ✔️ Nur 1x Schaden
                this.audioManager.play('chickenHurt');
                bottle.hasSplashed = true;
                bottle.hasHitEndboss = true; // ✅ verhindert Mehrfachschaden
                this.statusbarEndboss.setPercentage(this.endboss.energy);
            }
        });
    }
}