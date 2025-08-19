class Cloud extends MoveableObject {
    y=20;
    width = 500;
    height=200;

    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = 120 + Math.random() * 500;
        this.animateClouds();  
    }

    animateClouds() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}