function initLanguageManager() {
    const defaultLanguage = 'ru';
    const supportedLanguages = ['en', 'ru'];
    let currentLanguage;

    // Detect browser language or get from localStorage
    function detectLanguage() {
        const savedLanguage = localStorage.getItem('preferredLanguage');

        if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
            return savedLanguage;
        }

        // Try to detect from browser
        const browserLang = navigator.language.split('-')[0];
        return supportedLanguages.includes(browserLang) ? browserLang : defaultLanguage;
    }

    // Save language preference
    function saveLanguagePreference(lang) {
        localStorage.setItem('preferredLanguage', lang);
    }

    // Apply translations to the page
    function applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');

            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                // Handle different element types
                if (element.tagName === 'INPUT' && element.getAttribute('type') === 'placeholder') {
                    element.placeholder = translations[currentLanguage][key];
                } else {
                    element.textContent = translations[currentLanguage][key];
                }
            }
        });

        // Update toggle buttons to reflect current language
        updateLanguageToggle();

        // Update HTML lang attribute
        document.documentElement.lang = currentLanguage;
    }

    // Create and add language toggle to the navigation
    function createLanguageToggle() {
        const navLinks = document.querySelector('.nav-links');

        const toggleContainer = document.createElement('li');
        toggleContainer.className = 'language-toggle';
        toggleContainer.innerHTML = `
            <div class="language-selector">
                <button class="language-btn" data-lang="en">EN</button>
                <button class="language-btn" data-lang="ru">RU</button>
            </div>
        `;

        navLinks.appendChild(toggleContainer);

        // Add click handlers to language buttons
        const langButtons = document.querySelectorAll('.language-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                switchLanguage(lang);
            });
        });
    }

    // Update the language toggle to show active language
    function updateLanguageToggle() {
        const buttons = document.querySelectorAll('.language-btn');

        buttons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === currentLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Switch the language
    function switchLanguage(lang) {
        if (supportedLanguages.includes(lang) && lang !== currentLanguage) {
            currentLanguage = lang;
            saveLanguagePreference(lang);
            applyTranslations();
        }
    }

    // Function to get the current language
    function getCurrentLanguage() {
        return currentLanguage;
    }

    // Initialize language functionality
    function init() {
        currentLanguage = detectLanguage();
        createLanguageToggle();
        applyTranslations();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose methods to access language functionality
    window.switchLanguage = switchLanguage;
    window.getCurrentLanguage = getCurrentLanguage;
}
