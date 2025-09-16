/**
 * Represents the Endboss health/status bar.
 * Extends {@link DrawableObject}.
 */
class StatusbarEndboss extends DrawableObject {

    /**
     * Array of image paths for different health states of the Endboss.
     * @type {string[]}
     */
    IMAGES_STATUSBAR_ENDBOSS = [
        'assets/img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    /** Current percentage (0 to 100) representing the Endboss's health */
    percentage = 100;

    /**
     * Creates a new StatusbarEndboss instance.
     * Loads images, sets position and size, and initializes at 100%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the current health percentage and updates the displayed image.
     * @param {number} percentage - Health percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_ENDBOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct image index based on current percentage.
     * @returns {number} Index for the image array.
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
