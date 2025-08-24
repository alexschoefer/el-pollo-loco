class StatusbarEndboss extends DrawableObject {

    percentage = 100;

    IMAGES_STATUSBAR_ENDBOSS = [
        'assets/img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => Ermittlung einer Zahl zwischen 0 ... 5 
        let path = this.IMAGES_STATUSBAR_ENDBOSS[this.resovleImageIndex()];
        this.img = this.imageCache[path];

    }

    resovleImageIndex() {
        if (this.percentage == 100) {
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