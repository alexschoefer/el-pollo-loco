class AudioManager {
    constructor() {
        this.sounds = {
            coin: new Audio('assets/audio/collision-character-coin.wav'),
            bottle: new Audio('assets/audio/collision-character-bottle.wav'),
            hurt: new Audio('assets/audio/character-hurt.wav'),
            jump: new Audio('assets/audio/character-jump.wav'),
            walk: new Audio('assets/audio/character-walking.wav')
        };

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