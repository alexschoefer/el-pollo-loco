class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 250;

    IMAGES_CLOUD = [
        'assets/img/5_background/layers/4_clouds/1.png',
        'assets/img/5_background/layers/4_clouds/2.png'
    ]

    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.setRandomCloudPosition();
        this.animateClouds();
    }

    getRandomCloudImages() {
        let randomCloudImage = Math.floor(Math.random() * 2);
        return this.IMAGES_CLOUD[randomCloudImage];  
    }

    setRandomCloudPosition() {
        this.x = Math.floor(Math.random() * 2000);
    }

    animateClouds() {
        setInterval(() => {
            this.moveLeft();
        }, 60);

    }
}