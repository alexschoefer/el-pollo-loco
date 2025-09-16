/**
 * Represents a status bar showing coins collected or available.
 * Extends {@link DrawableObject}.
 */
class StatusbarCoins extends DrawableObject {

    /**
     * Array of image paths representing different coin fill levels.
     * Index corresponds roughly to percentage steps: 0%, 20%, 40%, 60%, 80%, 100%.
     * @type {string[]}
     */
    IMAGES_STATUSBAR_COINS = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /** Current percentage fill of the status bar (0 to 100). */
    percentage = 100;

    /**
     * Creates a new StatusbarCoins instance.
     * Loads images, sets position, size and initializes with 0% fill.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_COINS);
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the fill percentage of the status bar and updates the displayed image accordingly.
     * @param {number} percentage - The fill percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the appropriate image index based on the current percentage.
     * @returns {number} The index of the image in the `IMAGES_STATUSBAR_COINS` array.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
