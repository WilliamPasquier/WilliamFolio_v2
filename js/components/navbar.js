"use strict";

/**
 * All events
 */
const navbarEvents = () => {
    openLanguageSelector();
    detectButtonClick();
};

const openLanguageSelector = () => {
    const navbar = document.querySelector("#navigation-desktop");
    const languageToggle = navbar.querySelector("#language-toggle");
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

const detectButtonClick = () => {
    document
        .querySelectorAll(".navigation__language-selection")
        .forEach((button) => {
            button.addEventListener("click", function (event) {
                if (this.getAttribute("language-active") === "true") {
                    event.preventDefault();
                    return;
                }

                document
                    .querySelectorAll(".navigation__language-selection")
                    .forEach((btn) => {
                        btn.setAttribute("language-active", "false");
                    });

                this.setAttribute("language-active", "true");

                changeLanguage(this.id === "language-en" ? "en" : "fr");
            });
        });
};

const changeLanguage = (language) => {
    console.log('Current language :', language);
}
