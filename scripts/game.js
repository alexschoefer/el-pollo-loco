
let canvas;
let world;
let keyboard = new GameKeyBoard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') keyboard.RIGHT = true;
    if (event.code === 'ArrowLeft') keyboard.LEFT = true;
});

window.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowRight') keyboard.RIGHT = false;
    if (event.code === 'ArrowLeft') keyboard.LEFT = false;
});