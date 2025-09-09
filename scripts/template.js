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