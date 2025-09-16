class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(images) {
        images.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    drawFrame(ctx) {
        // if (this instanceof Chicken || this instanceof SmallChicken || this instanceof Chicken)  {
        //     ctx.beginPath();
        //     ctx.lineWidth = "6";
        //     ctx.strokeStyle = "blue";
        //     ctx.strokeRect(
        //         this.x + this.offset.left,
        //         this.y + this.offset.top,
        //         this.width - this.offset.left - this.offset.right,
        //         this.height - this.offset.top - this.offset.bottom
        //     );
        //     ctx.stroke();
        // }

        // if (this instanceof Chicken || this instanceof SmallChicken || this instanceof Chicken)  {
        //     ctx.beginPath();
        //     ctx.lineWidth = "6";
        //     ctx.strokeStyle = "red";
        //     ctx.strokeRect(
        //         this.x,
        //         this.y,
        //         this.width,
        //         this.height
        //     );
        //     ctx.stroke();
        // }
    }
}