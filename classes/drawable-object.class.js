/**
 * Base class for all drawable objects in the game.
 * Handles loading and rendering of images, as well as managing image caches.
 */
class DrawableObject {
    /** @type {HTMLImageElement} The currently displayed image. */
    img;

    /** @type {Object.<string, HTMLImageElement>} Cache for preloaded images. */
    imageCache = [];

    /** @type {number} Index of the current image (used for animations). */
    currentImage = 0;

    /** @type {number} Horizontal position of the object. */
    x = 120;

    /** @type {number} Vertical position of the object. */
    y = 280;

    /** @type {number} Height of the object. */
    height = 150;

    /** @type {number} Width of the object. */
    width = 100;

    /** 
     * @type {{ top: number, bottom: number, left: number, right: number }}
     * Defines the object's offset for collision detection.
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Loads a single image from the given path and assigns it to this object.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Draws the current image onto the canvas.
    * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Loads multiple images and stores them in the image cache.
    * Useful for animations.
    * @param {string[]} images - Array of image paths to preload.
    */
    loadImages(images) {
        images.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * (Debugging Only) Draws a visual frame around the object for collision debugging.
    * Note: Currently commented out. Can be enabled for collision box debugging.
    * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
    */
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