
let canvas;
let world;
let keyboard = new GameKeyBoard();
let gameIsOver = false;
let currentLevel = null;
let audioManager;

// function initMenuSound() {
//     audioManager = new AudioManager();
//     audioManager.play('menu');
// }

function startGameLevelBeginner() {
    currentLevel = 'beginner';
    saveSelectedLevelToLocalStorage(currentLevel);
    document.getElementById('game-level-overlay').classList.add('d_none');
    const canvasRef = document.getElementById('canvas');
    canvasRef.classList.remove('d_none');
    canvas = canvasRef;
    // Stoppe Menümusik
    audioManager.sounds.menu.pause();
    // Level starten
    let levelInstance = createLevelBeginner();
    world = new World(canvas, keyboard, levelInstance);
}

function startGameLevelExpert() {
    currentLevel = 'expert';
    saveSelectedLevelToLocalStorage(currentLevel);
    let gameLevelOverviewRef = document.getElementById('game-level-overlay');
    gameLevelOverviewRef.classList.add('d_none');
    let canvasRef = document.getElementById('canvas');
    canvasRef.classList.remove('d_none');
    canvas = canvasRef;
    // Stoppe Menümusik
    audioManager.sounds.menu.pause();
    let levelInstance = createLevelExpert();
    world = new World(canvas, keyboard, levelInstance);
}

window.addEventListener('keydown', (event) => {
    if (world && world.gameIsOver) return;
    if (event.code === 'ArrowRight') keyboard.RIGHT = true;
    if (event.code === 'ArrowLeft') keyboard.LEFT = true;
    if (event.code === 'Space') keyboard.SPACE = true;
    if (event.code === 'KeyD') keyboard.D = true;
});

window.addEventListener('keyup', (event) => {
    if (world && world.gameIsOver) return;
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

function goBackToMainMenu() {
    localStorage.removeItem("selectedLevel");
    let btnContainer = document.getElementById('btn-endscreen-container');
    let startgameRef = document.getElementById('startgame');
    let canvasRef = document.getElementById('canvas');
    canvasRef.classList.add('d_none');
    btnContainer.classList.add('d_none');
    startgameRef.classList.remove('d_none');
    if (!audioManager.isMuted) {
        audioManager.play('menu');
    }
}

function saveSelectedLevelToLocalStorage(currentLevel) {
    localStorage.setItem("selectedLevel", currentLevel);
}

function restartGame() {
    if (world) {
        // Stoppe alte World Animationen und Intervalle
        if (world.animationFrameId) cancelAnimationFrame(world.animationFrameId);
        if (world.intervalId) clearInterval(world.intervalId);
    }

    // Buttons & Endscreen verstecken
    const btnContainer = document.getElementById('btn-endscreen-container');
    btnContainer.classList.add('d_none');

    // Canvas löschen
    let canvasRef = document.getElementById('canvas');
    let ctx = canvasRef.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);

    // Neue Tastatur erzeugen
    keyboard = new GameKeyBoard();

    // Neues Spiel starten basierend auf gespeichertem Level
    let selectedLevel = localStorage.getItem('selectedLevel');
    if (selectedLevel === 'beginner') {
        world = new World(canvasRef, keyboard, createLevelBeginner());
    } else {
        world = new World(canvasRef, keyboard, createLevelExpert());
    }
}

function openLegalNotice() {
    let startgameRef = document.getElementById('startgame');
    let legalNoticeRef = document.getElementById('legal-notice');
    startgameRef.classList.add('d_none');
    legalNoticeRef.classList.remove('d_none');
    legalNoticeRef.innerHTML = "";
    legalNoticeRef.innerHTML += showLegalNoticeTemplate();
}

function closeLegalNotice() {
    let startgameRef = document.getElementById('startgame');
    let legalNoticeRef = document.getElementById('legal-notice');
    startgameRef.classList.remove('d_none');
    legalNoticeRef.classList.add('d_none');
}
