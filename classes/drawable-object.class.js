/**
 * Represents a drawable object in the game.
 * Provides basic functionality for rendering images, loading single or multiple images,
 * and drawing optional debug frames.
 */
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

    /**
     * Loads a single image and assigns it to the object for rendering.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the given canvas context using its current image.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images into the image cache for animation use.
     * @param {string[]} images - An array of image file paths.
     */
    loadImages(images) {
        images.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Optionally draws a debug rectangle (hitbox) around the object.
     * This method can be customized or uncommented during development
     * to visually debug object collisions.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    drawFrame(ctx) {
      if (this instanceof Character || this instanceof Bottles)  {
            ctx.beginPath();
            ctx.lineWidth = "6";
            ctx.strokeStyle = "blue";
            ctx.strokeRect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }

        // Draw object boundary
        // ctx.beginPath();
        // ctx.lineWidth = "2";
        // ctx.strokeStyle = "red";
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        // ctx.stroke();
    }
}
