
let canvas;
let world;
let keyboard = new GameKeyBoard();
let gameIsOver = false;
let currentLevel = null;
let audioManager;

function initMenu() {
    initMenuSound();
    initTouchButtons();
}

function initMenuSound() {
    audioManager = new AudioManager();
    audioManager.play('menu');
}

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

function initTouchButtons() {
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnJump = document.getElementById('btn-jump');
    const btnThrow = document.getElementById('btn-throw');

    if (!btnLeft || !btnRight || !btnJump || !btnThrow) return;

    // Bewegung
    btnLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    btnLeft.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    btnRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    btnRight.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    // Springen
    btnJump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    btnJump.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    // Werfen
    btnThrow.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    btnThrow.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}


function showControlOverview() {
    document.getElementById('startgame').classList.add('d_none');

    const controlOverlay = document.getElementById('control-overlay');
    controlOverlay.classList.remove('d_none');
    controlOverlay.innerHTML = showControlTemplate();
}

function closeControlOverview() {
    let startgameRef = document.getElementById('startgame');
    let controlOverviewRef = document.getElementById('control-overlay');
    startgameRef.classList.remove('d_none');
    controlOverviewRef.classList.add('d_none');
}

function chooseGameLevel() {
    // Alle anderen Overlays schließen
    document.getElementById('legal-notice').innerHTML = '';
    document.getElementById('control-overlay').innerHTML = '';
    document.getElementById('startgame').classList.add('d_none');

    const gameLevelOverlay = document.getElementById('game-level-overlay');
    gameLevelOverlay.classList.remove('d_none');
    gameLevelOverlay.innerHTML = showGameLevelTemplate();
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
        if (world.animationFrameId) cancelAnimationFrame(world.animationFrameId);
        if (world.intervalId) clearInterval(world.intervalId);
    }
    const btnContainer = document.getElementById('btn-endscreen-container');
    btnContainer.classList.add('d_none');
    let canvasRef = document.getElementById('canvas');
    let ctx = canvasRef.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
    keyboard = new GameKeyBoard();

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
    let controlOverviewRef = document.getElementById('control-overlay');
    controlOverviewRef.innerHTML = "";
    let gameLevelOverviewRef = document.getElementById('game-level-overlay');
    gameLevelOverviewRef.innerHTML = "";
    startgameRef.classList.add('d_none');
    legalNoticeRef.classList.remove('d_none');
    const canvasRef = document.getElementById('canvas');
    canvasRef.classList.add('d_none');
    legalNoticeRef.innerHTML = "";
    legalNoticeRef.innerHTML += showLegalNoticeTemplate();
}

function closeLegalNotice() {
    let startgameRef = document.getElementById('startgame');
    let legalNoticeRef = document.getElementById('legal-notice');
    startgameRef.classList.remove('d_none');
    legalNoticeRef.classList.add('d_none');
    legalNoticeRef.innerHTML = "";
}


function generateEnemies(Type, count, startX, spacing) {
    const enemies = [];
    for (let i = 0; i < count; i++) {
        const enemy = new Type();
        enemy.x = startX + i * spacing;
        enemies.push(enemy);
    }

    return enemies;
}

