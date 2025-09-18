/**
 * Represents a health status bar that visually indicates the player's health percentage.
 * Extends DrawableObject to manage loading and drawing health bar images.
 */
class StatusbarHealth extends DrawableObject {

    /**
     * Array of image paths representing different health levels.
     * @type {string[]}
     */
    IMAGES_STATUSBAR_HEALTH = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Current health percentage (0 to 100).
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a new health status bar instance.
     * Initializes position, size, loads images, and sets default percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_HEALTH);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Updates the displayed health percentage and changes the image accordingly.
     * @param {number} percentage - The current health percentage (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct image index based on the current health percentage.
     * @returns {number} The index of the image corresponding to the current health level.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
