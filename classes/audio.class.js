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
            menu: new Audio('assets/audio/game-menu.mp3'),
            chickenHurt: new Audio('assets/audio/chicken-hurt.wav'),
            endbossAttack: new Audio('assets/audio/chicken-attack.wav'),
            snore: new Audio('assets/audio/character-snore.wav')
        };

        this.loopedSounds = ['game', 'menu', 'snore'];
        this.defaultVolume = 0.15;
        this.isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;

        this.lastPlayed = {}; // Neu: Zeitstempel pro Sound

        for (const [name, sound] of Object.entries(this.sounds)) {
            sound.volume = this.defaultVolume;
            sound.loop = this.loopedSounds.includes(name);
        }

        this.muteAll(this.isMuted);
    }

    /**
     * Spielt einen Sound ab, verhindert schnelle Wiederholungen.
     */
    play(name) {
        const sound = this.sounds[name];
        if (!sound || this.isMuted) return;
    
        // Loop-Sound? Nur einmal starten!
        if (this.loopedSounds.includes(name) && !sound.paused) return;
    
        const now = Date.now();
        const last = this.lastPlayed[name] || 0;
        const minDelay = 100;
    
        if (now - last < minDelay) return;
        this.lastPlayed[name] = now;
    
        try {
            if (!this.loopedSounds.includes(name)) {
                sound.pause();
                sound.currentTime = 0;
            }
    
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn(`AudioManager: Fehler beim Abspielen von '${name}':`, error);
                });
            }
        } catch (error) {
            console.warn(`AudioManager: Fehler beim Abspielen von '${name}':`, error);
        }
    }
    

    /**
     * Mutes or unmutes all sounds, and resets currentTime.
     */
    muteAll(mute) {
        this.isMuted = mute;
        localStorage.setItem('isMuted', JSON.stringify(mute));

        for (const [name, sound] of Object.entries(this.sounds)) {
            sound.pause();
            sound.currentTime = 0;

            if (mute) {
                sound.volume = 0;
                if (this.loopedSounds.includes(name)) {
                    sound.loop = false; // Loop sofort deaktivieren
                }
            } else {
                sound.volume = this.defaultVolume;
            }
        }

        if (!mute) {
            // Loops reaktivieren mit kleinem Delay
            setTimeout(() => {
                this.loopedSounds.forEach(name => {
                    if (this.sounds[name]) {
                        this.sounds[name].loop = true;
                    }
                });
            }, 200);
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
                // NICHT: sound.loop = false;
                // einfach in Ruhe lassen
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

    stop(name) {
        const sound = this.sounds[name];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
            sound.volume = this.defaultVolume;
    
            // Falls Loop-Sound, temporär Loop aus (optional):
            if (this.loopedSounds.includes(name)) {
                sound.loop = false;
    
                // Nach kurzer Zeit wieder aktivieren
                setTimeout(() => {
                    sound.loop = true;
                }, 200);
            }
        }
    }

    /**
 * Spielt einen Sound mit etwas Verzögerung ab, um Browserprobleme (z. B. AbortError) zu vermeiden.
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
