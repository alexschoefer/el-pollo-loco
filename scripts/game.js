
let canvas;
let world;
let keyboard = new GameKeyBoard();
let gameIsOver = false;
let currentLevel = null;
let audioManager;

/**
 * Initializes the main menu by setting up audio and touch buttons.
 */
function initMenu() {
    initMenuSound();
    initTouchButtons();
}

/**
 * Initializes and plays the menu background sound.
 */
function initMenuSound() {
    audioManager = new AudioManager();
}

/**
 * Starts the beginner game level and initializes the game world.
 */
function startGameLevelBeginner() {
    currentLevel = 'beginner';
    saveSelectedLevelToLocalStorage(currentLevel);
    document.getElementById('game-level-overlay').classList.add('d_none');
    const canvasRef = document.getElementById('canvas');
    canvasRef.classList.remove('d_none');
    canvas = canvasRef;
    audioManager.sounds.menu.pause();
    let levelInstance = createLevelBeginner();
    world = new World(canvas, keyboard, levelInstance);
    showMobileButtonsIfNeeded();
}

/**
 * Starts the expert game level and initializes the game world.
 */
function startGameLevelExpert() {
    currentLevel = 'expert';
    saveSelectedLevelToLocalStorage(currentLevel);
    document.getElementById('game-level-overlay').classList.add('d_none');
    const canvasRef = document.getElementById('canvas');
    canvasRef.classList.remove('d_none');
    canvas = canvasRef;
    audioManager.sounds.menu.pause();
    let levelInstance = createLevelExpert();
    world = new World(canvas, keyboard, levelInstance);
    showMobileButtonsIfNeeded();
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

/**
 * Initializes touch event listeners for on-screen mobile controls.
 */
function initTouchButtons() {
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnJump = document.getElementById('btn-jump');
    const btnThrow = document.getElementById('btn-throw');
    if (!btnLeft || !btnRight || !btnJump || !btnThrow) return;
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
    btnJump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    btnJump.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    btnThrow.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    btnThrow.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}

/**
 * Displays the control overview screen with key mappings.
 */
function showControlOverview() {
    document.getElementById('startgame').classList.add('d_none');

    const controlOverlay = document.getElementById('control-overlay');
    controlOverlay.classList.remove('d_none');
    controlOverlay.innerHTML = showControlTemplate();
}

/**
 * Closes the control overview and returns to the main menu.
 */
function closeControlOverview() {
    let startgameRef = document.getElementById('startgame');
    let controlOverviewRef = document.getElementById('control-overlay');
    startgameRef.classList.remove('d_none');
    controlOverviewRef.classList.add('d_none');
}

/**
 * Opens the game level selection overlay and hides other overlays.
 */
function chooseGameLevel() {
    document.getElementById('legal-notice').innerHTML = '';
    document.getElementById('control-overlay').innerHTML = '';
    document.getElementById('startgame').classList.add('d_none');
    const gameLevelOverlay = document.getElementById('game-level-overlay');
    gameLevelOverlay.classList.remove('d_none');
    gameLevelOverlay.innerHTML = showGameLevelTemplate();
    if (!audioManager.isMuted && audioManager.sounds.menu.paused) {
        audioManager.play('menu');
    }
}

/**
 * Closes the game level selection overlay and shows the main menu.
 */
function closeGameLevelOverlay() {
    let startgameRef = document.getElementById('startgame');
    let gameLevelOverviewRef = document.getElementById('game-level-overlay');
    startgameRef.classList.remove('d_none');
    gameLevelOverviewRef.classList.add('d_none');
}

/**
 * Returns the player to the main menu, resets level state and restarts menu music.
 */
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

/**
 * Saves the selected game level to local storage.
 * @param {string} currentLevel - The selected level name ('beginner' or 'expert').
 */
function saveSelectedLevelToLocalStorage(currentLevel) {
    localStorage.setItem("selectedLevel", currentLevel);
}

/**
 * Restarts the current game level by resetting world state and reloading the level.
 */
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
        showMobileButtonsIfNeeded();
    } else {
        world = new World(canvasRef, keyboard, createLevelExpert());
        showMobileButtonsIfNeeded();
    }
}

/**
 * Opens the legal notice screen and hides other overlays.
 */
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
    const dropdown = document.getElementById('burgerDropdown');
    dropdown.classList.add('d_none');
}

/**
 * Closes the legal notice screen and returns to the main menu.
 */
function closeLegalNotice() {
    let startgameRef = document.getElementById('startgame');
    let legalNoticeRef = document.getElementById('legal-notice');
    startgameRef.classList.remove('d_none');
    legalNoticeRef.classList.add('d_none');
    legalNoticeRef.innerHTML = "";
}

/**
 * Creates and returns an array of enemy instances with randomized spacing and no overlap.
 * @param {Function} Type - Enemy class constructor.
 * @param {number} count - Number of enemies to generate.
 * @param {number} startX - Starting X position for the first enemy.
 * @param {number} minSpacing - Minimum spacing between enemies.
 * @param {number} maxSpacing - Maximum spacing between enemies.
 * @returns {Array} List of generated enemies.
 */
function generateEnemies(Type, count, startX, minSpacing, maxSpacing) {
    const enemies = [];
    let currentX = startX;

    for (let i = 0; i < count; i++) {
        const enemy = new Type();
        enemy.x = currentX;
        const spacing = Math.floor(Math.random() * (maxSpacing - minSpacing + 1)) + minSpacing;
        currentX += spacing;

        enemies.push(enemy);
    }

    return enemies;
}


/**
 * Resizes the canvas element to maintain aspect ratio on window resize.
 */
function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    const ratio = 720 / 480;
    const width = Math.min(window.innerWidth, 720);
    const height = width / ratio;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);

/**
 * Shows mobile control buttons if the screen width is below the mobile threshold.
 */
function showMobileButtonsIfNeeded() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 1180;
    const shouldShowMobileButtons = isTouchDevice && isSmallScreen;

    const mobileButtons = document.getElementById('mobile-buttons');
    if (shouldShowMobileButtons && mobileButtons.classList.contains('d_none')) {
        mobileButtons.classList.remove('d_none');
    } else if (!shouldShowMobileButtons && !mobileButtons.classList.contains('d_none')) {
        mobileButtons.classList.add('d_none');
    }
}

/**
 * Toggles the visibility of the burger menu dropdown.
 */
function toggleBurgerMenu() {
    const dropdown = document.getElementById('burgerDropdown');
    dropdown.classList.toggle('d_none');
}

/**
 * Closes the burger menu if a click is detected outside the menu or the burger icon.
 */
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('burgerDropdown');
    const burgerBtn = document.querySelector('.burger-icon');

    if (!dropdown.contains(event.target) && !burgerBtn.contains(event.target)) {
        dropdown.classList.add('d_none');
    }
});

