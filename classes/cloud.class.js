class Cloud extends MoveableObject {
    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = 200 + Math.random() * 500; //Positionierung der Chicken zwischen 200 und 700
    }
}