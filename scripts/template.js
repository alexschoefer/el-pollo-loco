function showLegalNoticeTemplate() {
    return `
            <div class="legal-notice-screen">
            <div class="legal-notice-headline-container">
                <h1>Legal Notice - <span class="highlight-gamename">El Pollo Loco</span></h1>
                <button class="btn-close-legal-notice" onclick="closeLegalNotice()">X</button>
            </div>
            <div class="legal-notice-content">
                <p class="highlight-words"><strong>Information according to § 5 TMG</strong></p>
                <p>
                Alexander Schöfer<br>
                Moosstraße 1<br>
                85391 Allershausen<br>
                Germany
                </p>

                <p class="highlight-words"><strong>Contact</strong></p>
                <p>
                Phone: +49 152 24092032<br>
                Email: alexander.schoefer@web.de
                </p>

                <p class="highlight-words"><strong>Responsibility for content</strong></p>
                <p>
                As a service provider, I am responsible for my own content on these pages according to § 7 para.1 TMG.
                However, according to §§ 8 to 10 TMG, I am not obligated to monitor transmitted or stored third-party information.
                </p>

                <p class="highlight-words"><strong>Liability for links</strong></p>
                <p>
                My offer contains links to external third-party websites over whose content I have no influence.
                Therefore, I cannot accept any liability for these external contents. The respective provider or operator
                of the pages is always responsible for the content of the linked pages.
                </p>

                <p class="highlight-words"><strong>Copyright</strong></p>
                <p>
                The content and works on these pages created by the site operator are subject to German copyright law.
                Duplication, processing, distribution, or any form of commercialization of such material
                beyond the scope of the copyright law shall require the prior written consent of the author or creator.
                </p>

                <p class="highlight-words"><strong>Non-commercial project</strong></p>
                <p>
                This is a private, non-commercial web game project created for educational and entertainment purposes only.
                </p>
            </div>
            </div>
    `
}

function showControlTemplate() {
    return `
        <div class="controlscreen">
            <h2>Control overview</h2>
            <div class="control-slogan">
                <p>For playing character Pepe you only need your keyboard or the mobile keys.</p>
            </div>
            <div class="control-container-wrapper">
                <div class="control-container">
                    <div class="control-button">
                        <span class="key">←</span>
                        <span class="key-description">Move left</span>
                    </div>
                    <div class="control-button">
                        <span class="key">→</span>
                        <span class="key-description">Move right</span>
                    </div>
                </div>
                <div class="control-container">
                    <div class="control-button">
                        <span class="key">SPACE</span>
                        <span class="key-description">Jump</span>
                    </div>
                    <div class="control-button">
                        <span class="key">D</span>
                        <span class="key-description">Throw bottles</span>
                    </div>
                </div>
            </div>
            <div>
                <button class="btn-close-control-overview" onclick="closeControlOverview()">Close control overview</button>
            </div>
        </div>
    `;
}

function showGameLevelTemplate() {
    return `
         <div class="game-introduction-container">
            <h2>
              El Pollo Loco – The desert adventure begins!
            </h2>
            <div class="game-description-container">
              <p class="game-description">
                <span class="highlight-words">¡Hola, amigo!</span> You are <span class="highlight-words">Pepe</span>, a
                brave hero in search of coins and adventures!
                Accompany him through the hot desert, <span class="highlight-words">collect bottles</span> and <span
                  class="highlight-words">coins</span> and <span class="highlight-words">face wild chickens.</span> <br>
                Defeat enemies by jumping or throwing bottles. <br>
                <span class="highlight-words">But be careful:</span> Only bottles can defeat the final boss at the end.
                <br> <span class="highlight-words-endboss">The Giant
                  Chicken</span>
              </p>
              <p> Are you up to the challenge? <span class="highlight-words">Choose your level.</span></p>
            </div>
            <div class="btn-level-container">
              <div class="btn-level-beginner-container">
                <button class="btn-level" onclick="startGameLevelBeginner()">Beginner</button>
                <p>Easier and fewer enemies, lots of bottles and coins to collect.</p>
              </div>
              <div class="btn-level-expert-container">
                <button class="btn-level" onclick="startGameLevelExpert()">Expert</button>
                <p>More difficult and more enemies, fewer bottles and coins to collect.</p>
              </div>
            </div>
            <div>
              <button class="btn-close-gamelevel-overview" onclick="closeGameLevelOverlay()">Back to
                Startscreen</button>
            </div>
          </div>
        </div>
    `
}