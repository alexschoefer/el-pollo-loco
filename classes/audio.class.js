/**
 * Manages all game-related audio, including sound effects and background music.
 */
class AudioManager {
    constructor() {
        /**
         * A collection of all audio elements used in the game.
         * @type {Object<string, HTMLAudioElement>}
         */
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
            menu: new Audio('assets/audio/game-menu.mp3'),
            chickenHurt: new Audio('assets/audio/chicken-hurt.wav'),
            endbossAttack: new Audio('assets/audio/chicken-attack.wav'),
            snore: new Audio('assets/audio/character-snore.wav')
        };

        this.sounds.game.loop = true;
        this.sounds.snore.loop = true;
        this.sounds.menu.loop = true;
        /** @type {boolean} Indicates whether all sounds are muted. */
        this.isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;
        this.sounds.game.volume = 0.2;
        this.muteAll(this.isMuted);
    }

    /**
     * Plays a sound by name if not muted and not already playing.
     * @param {string} name - The key of the sound in the `sounds` object.
     */
    play(name) {
        const sound = this.sounds[name];
        if (sound && !this.isMuted) {
            if (!sound.paused && !sound.ended) return;
            sound.currentTime = 0;
            sound.play().catch((error) => {
                console.warn(`AudioManager: Failed to play sound '${name}':`, error);
            });
        }
    }

    /**
     * Mutes or unmutes all sounds.
     * Also resets each sound's playback position.
     * @param {boolean} mute - Whether to mute all sounds.
     */
    muteAll(mute) {
        this.isMuted = mute;

        if (mute) {
            for (const sound of Object.values(this.sounds)) {
                sound.pause();
                sound.currentTime = 0;
            }
        }
    }

    /**
     * Stops and resets all currently loaded sounds.
     */
    stopAllSounds() {
        for (const sound of Object.values(this.sounds)) {
            sound.pause();
            sound.currentTime = 0;
        }
    }
}
