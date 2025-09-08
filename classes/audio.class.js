class AudioManager {
    constructor() {
        this.sounds = {
            coin: new Audio('assets/audio/collision-character-coin.wav'),
            bottle: new Audio('assets/audio/collision-character-bottle.wav'),
            hurt: new Audio('assets/audio/character-hurt.wav'),
            jump: new Audio('assets/audio/character-jump.wav'),
            walk: new Audio('assets/audio/character-walking.wav'),
            throw: new Audio('assets/audio/bottle-throw.wav'),
            game: new Audio('assets/audio/game-background-sound.mp3'),
            gameover: new Audio('assets/audio/character-lose.wav'),
            win: new Audio('assets/audio/character-win.mp3'),
            menu: new Audio('assets/audio/game-menu.mp3')
        };
        this.sounds.game.loop = true;
        this.sounds.menu.loop = true;
        this.sounds.game.volume = 0.2; 
        this.isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;
        this.muteAll(this.isMuted);
    }

    play(name) {
        const sound = this.sounds[name];
        if (sound && !this.isMuted) {
            sound.currentTime = 0;
            sound.play();
        }
    }

    muteAll(mute) {
        this.isMuted = mute;
    
        if (mute) {
            for (const sound of Object.values(this.sounds)) {
                sound.pause();
                sound.currentTime = 0; // zurückspulen
            }
        }
    }
}