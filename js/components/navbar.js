"use strict";

/**
 * All navigation bar related events
 */
const navbarEvents = () => {
    const desktopNavbar = document.querySelector("#navigation-desktop");
    const tabletNavbar = document.querySelector("#navigation-tablet");
    const mobileNavbar = document.querySelector("#navigation-mobile");

    if (isMobile()) {
        console.log("mobile or tablet");

        if (window.innerWidth <= 768) {
            console.log("Its mobile size");
            if (tabletNavbar) tabletNavbar.remove();
            if (desktopNavbar) desktopNavbar.remove();
            const languageToggleMobile = mobileNavbar.querySelector(
                "#language-toggle-mobile"
            );

            openLanguageSelector(mobileNavbar, languageToggleMobile);
            toggleBurgerMenu(mobileNavbar);
        } else {
            console.log("Its tablet size");
            if (mobileNavbar) mobileNavbar.remove();
            if (desktopNavbar) desktopNavbar.remove();
            const languageToggleTablet = tabletNavbar.querySelector(
                "#language-toggle-tablet"
            );

            openLanguageSelector(tabletNavbar, languageToggleTablet);
        }
    } else {
        console.log("Its laptop");
        if (mobileNavbar) mobileNavbar.remove();
        if (tabletNavbar) tabletNavbar.remove();
        const languageToggle = desktopNavbar.querySelector("#language-toggle");

        openLanguageSelector(desktopNavbar, languageToggle);
    }

    detectLanguageClick();
};

/**
 * Toggle language sub menu.
 * @param {HTMLDivElement} navbar - Navbar element.
 * @param {*} languageToggle - Language button toggle element.
 */
const openLanguageSelector = (navbar, languageToggle) => {
    const languageSelections = navbar.querySelector(
        ".navigation__language-selections"
    );

    languageToggle.addEventListener("click", () => {
        const selectorHidden =
            languageSelections.getAttribute("selector-hidden");
        const languageButtons = languageSelections.querySelectorAll(
            ".navigation__language-selection"
        );

        if (selectorHidden === "true") {
            languageSelections.setAttribute("selector-hidden", false);
            languageToggle.classList.remove("navigation__language-open");
            languageToggle.classList.remove("wf-icon-globe");
            languageToggle.classList.add("navigation__language-close");
            languageToggle.classList.add("wf-icon-cross");

            setTimeout(() => {
                languageButtons.forEach((buttons) => {
                    buttons.classList.add("show");
                });
            }, 100);
        } else {
            setTimeout(() => {
                languageButtons.forEach((buttons) => {
                    buttons.classList.remove("show");
                });
            }, 100);

            languageSelections.setAttribute("selector-hidden", true);
            languageToggle.classList.remove("navigation__language-close");
            languageToggle.classList.remove("wf-icon-cross");
            languageToggle.classList.add("navigation__language-open");
            languageToggle.classList.add("wf-icon-globe");
        }
    });
};

/**
 * Detect language click.
 */
const detectLanguageClick = () => {
    document
        .querySelectorAll(".navigation__language-selection")
        .forEach((button) => {
            button.addEventListener("click", (event) => {
                if (button.getAttribute("language-active") === "true") {
                    event.preventDefault();
                    return;
                }

                document
                    .querySelectorAll(".navigation__language-selection")
                    .forEach((btn) => {
                        btn.setAttribute("language-active", "false");
                    });

                button.setAttribute("language-active", "true");

                changeLanguage(this.id === "language-en" ? "en" : "fr");
            });
        });
};

/**
 * TODO : Change language
 * @param {*} language - Language value.
 */
const changeLanguage = (language) => {
    console.log("Current language :", language);
};

/**
 * Toggle burger menu.
 * @param {*} navbar - Navbar element.
 */
const toggleBurgerMenu = (navbar) => {
    const burgerButton = navbar.querySelector("#mobile-burger");
    const navContainer = navbar.querySelector(".navigation__container");

    burgerButton.addEventListener("click", () => {
        const isExtended = burgerButton.getAttribute("data-extended");
        const sections = navbar.querySelectorAll(
            ".navigation__section--mobile"
        );
        const languageToggle = navbar.querySelector("#language-toggle-mobile");

        if (isExtended === "false") {
            burgerButton.classList.remove("wf-icon-burger");
            burgerButton.classList.add("wf-icon-cross");
            burgerButton.setAttribute("data-extended", true);
            navContainer.style.display = "flex";

            setTimeout(() => {
                sections.forEach((section) => {
                    section.classList.add("show");
                });
                languageToggle.classList.add("show");
            }, 100);
        } else {
            setTimeout(() => {
                sections.forEach((section) => {
                    section.classList.remove("show");
                });
                languageToggle.classList.remove("show");
            }, 100);

            burgerButton.classList.remove("wf-icon-cross");
            burgerButton.classList.add("wf-icon-burger");
            burgerButton.setAttribute("data-extended", false);
            navContainer.style.display = "none";
        }
    });
};
