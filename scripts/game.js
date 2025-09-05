
let canvas;
let world;
let keyboard = new GameKeyBoard();

function startGameLevelBeginner() {
    let gameLevelOverviewRef = document.getElementById('game-level-overlay');
    gameLevelOverviewRef.classList.add('d_none');
    let canvasRef = document.getElementById('canvas');
    canvasRef.classList.remove('d_none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (event) => {

    if (event.code === 'ArrowRight') keyboard.RIGHT = true;
    if (event.code === 'ArrowLeft') keyboard.LEFT = true;
    if (event.code === 'Space') keyboard.SPACE = true;
    if (event.code === 'KeyD') keyboard.D = true;
});

window.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowRight') keyboard.RIGHT = false;
    if (event.code === 'ArrowLeft') keyboard.LEFT = false;
    if (event.code === 'Space') keyboard.SPACE = false;
    if (event.code === 'KeyD') keyboard.D = false;
});


function showControlOverview() {
    let startgameRef = document.getElementById('startgame');
    let controlOverviewRef = document.getElementById('control-overlay');
    startgameRef.classList.add('d_none');
    controlOverviewRef.classList.remove('d_none');
}

function closeControlOverview() {
    let startgameRef = document.getElementById('startgame');
    let controlOverviewRef = document.getElementById('control-overlay');
    startgameRef.classList.remove('d_none');
    controlOverviewRef.classList.add('d_none');
}

function chooseGameLevel() {
    let startgameRef = document.getElementById('startgame');
    let gameLevelOverviewRef = document.getElementById('game-level-overlay');
    startgameRef.classList.add('d_none');
    gameLevelOverviewRef.classList.remove('d_none');
}

function closeGameLevelOverlay() {
    let startgameRef = document.getElementById('startgame');
    let gameLevelOverviewRef = document.getElementById('game-level-overlay');
    startgameRef.classList.remove('d_none');
    gameLevelOverviewRef.classList.add('d_none');
}