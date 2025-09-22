class AudioManager {
    /**
     * Creates a new instance of the AudioManager. Initializes and loads all game audio assets, sets default volume levels,
     * applies looping to specific background sounds, and restores mute state from localStorage if previously saved.
     */
    constructor() {
        this.sounds = {
            coin: new Audio('assets/audio/collision-character-coin.mp3'),
            bottle: new Audio('assets/audio/collision-character-bottle.mp3'),
            hurt: new Audio('assets/audio/character-hurt.mp3'),
            jump: new Audio('assets/audio/character-jump.mp3'),
            walk: new Audio('assets/audio/character-walking.mp3'),
            throw: new Audio('assets/audio/bottle-throw.mp3'),
            game: new Audio('assets/audio/game-background-sound.mp3'),
            gameover: new Audio('assets/audio/character-lose.mp3'),
            win: new Audio('assets/audio/character-win.mp3'),
            menu: new Audio('assets/audio/game-menu.mp3'),
            chickenHurt: new Audio('assets/audio/chicken-hurt.mp3'),
            endbossAttack: new Audio('assets/audio/chicken-attack.mp3'),
            snore: new Audio('assets/audio/character-snore.mp3')
        };

        this.loopedSounds = ['game', 'menu', 'snore'];
        this.defaultVolume = 0.15;
        this.isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;
        this.lastPlayed = {};
        for (const [name, sound] of Object.entries(this.sounds)) {
            sound.volume = this.defaultVolume;
            sound.loop = this.loopedSounds.includes(name);
        }

        this.muteAll(this.isMuted);
    }

    /**
     * Plays a sound by its name while preventing rapid replays.
     * If the sound is in the list of looped sounds and is already playing, it won't be replayed.
     *
     * @param {string} name - The name/key of the sound to play.
     */
    play(name) {
        const sound = this.sounds[name];
        if (!sound || this.isMuted) return;
        if (this.skipSoundIfAlreadyPlay(name, sound)) return;
    
        this.lastPlayed[name] = Date.now();
        try {
            this.resetSound(name, sound);
            sound.play()?.catch(err => this.logError(name, err));
        } catch (err) {
            this.logError(name, err);
        }
    }
    
    /**
     * Determines whether the sound playback should be skipped.
     * Skips playback if the sound is already playing in a loop or 
     * if the minimum delay between plays has not passed.
     * 
     * @param {string} name - The name/key of the sound to check.
     * @param {HTMLAudioElement} sound - The sound object to evaluate.
     * @returns {boolean} True if playback should be skipped, false otherwise.
     */
    skipSoundIfAlreadyPlay(name, sound) {
        const now = Date.now();
        const last = this.lastPlayed[name] || 0;
        return this.loopedSounds.includes(name) && !sound.paused || (now - last < 100);
    }

    /**
     * Prepares a sound for replay by resetting it,
     * but only if it's not a looped sound.
     * 
     * @param {string} name - The name/key of the sound to prepare.
     * @param {HTMLAudioElement} sound - The sound object to prepare.
     */
    resetSound(name, sound) {
        if (!this.loopedSounds.includes(name)) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /**
     * Logs an error to the console when sound playback fails.
     * 
     * @param {string} name - The name/key of the sound that failed to play.
     * @param {any} error - The error object or message thrown during playback.
     */
    logError(name, error) {
        console.warn(`AudioManager: Fehler beim Abspielen von '${name}':`, error);
    }

    /**
     * Mutes or unmutes all sounds and resets their playback position.
     * Looping sounds are paused and loop is temporarily disabled when muted.
     *
     * @param {boolean} mute - Whether to mute (true) or unmute (false) all sounds.
     */
    muteAll(mute) {
        this.isMuted = mute;
        localStorage.setItem('isMuted', JSON.stringify(mute));
        for (const [name, sound] of Object.entries(this.sounds)) {
            sound.pause();
            sound.currentTime = 0;
            sound.volume = mute ? 0 : this.defaultVolume;
            if (this.loopedSounds.includes(name)) {
                sound.loop = !mute;
            }
        }
        if (!mute) {
            setTimeout(() => this.loopedSounds.forEach(name => {
                this.sounds[name] && (this.sounds[name].loop = true);
            }), 200);
        }
    }
    
    /**
     * Stops all sounds immediately.
     */
    stopAllSounds() {
        for (const [name, sound] of Object.entries(this.sounds)) {
            if (!sound) continue;

            sound.pause();
            sound.currentTime = 0;

            if (this.loopedSounds.includes(name)) {
            }
        }
    }

    /**
     * Returns true if the sound is actively playing.
     */
    isPlaying(name) {
        const sound = this.sounds[name];
        return sound && !sound.paused && sound.currentTime > 0 && !sound.ended;
    }

    /**
     * Debug: Logs all currently playing sounds.
     */
    checkActiveSounds() {
        for (const [name, sound] of Object.entries(this.sounds)) {
            if (!sound.paused && sound.currentTime > 0 && !sound.ended) {
                console.log(`[DEBUG] Aktiver Sound: '${name}' - ${sound.currentTime.toFixed(2)}s`);
            }
        }
    }

    /**
     * Stops and resets a specific sound by name.
     * @param {string} name - The name/key of the sound to stop.
     */
    stop(name) {
        const sound = this.sounds[name];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
            sound.volume = this.defaultVolume;
            if (this.loopedSounds.includes(name)) {
                sound.loop = false;
                setTimeout(() => {
                    sound.loop = true;
                }, 200);
            }
        }
    }

    /**
     * Safely plays a sound after a short delay to avoid browser playback errors
     * @param {string} name - The name/key of the sound to play.
     * @param {number} [delay=100] - Optional delay in milliseconds before playing the sound.
     */
    safePlay(name, delay = 100) {
        const sound = this.sounds[name];
        if (!sound || this.isMuted) return;

        setTimeout(() => {
            if (!this.isPlaying(name)) {
                sound.play().catch(err => {
                    console.warn(`AudioManager: Fehler beim Abspielen von '${name}':`, err);
                });
            }
        }, delay);
    }
}
