class StatusbarBottles extends DrawableObject {

    IMAGES_STATUSBAR_BOTTLES = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]

    percentage = 100;

    /**
     * Creates a statusbar of the collected bottles
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_BOTTLES);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Updates the status bar image based on the given percentage.
     * 
     * @param {number} percentage - The current percentage (0 to 100) of bottles collected.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        const path = this.IMAGES_STATUSBAR_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image to display based on the current percentage.
     * 
     * @returns {number} Index in the IMAGES_STATUSBAR_BOTTLES array.
     */
    resolveImageIndex() {
        if (this.percentage === 100) return 5;
        if (this.percentage > 80) return 4;
        if (this.percentage > 60) return 3;
        if (this.percentage > 40) return 2;
        if (this.percentage > 20) return 1;
        return 0;
    }
}