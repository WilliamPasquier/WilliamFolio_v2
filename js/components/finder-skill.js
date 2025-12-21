"use strict";

var navSkillItems = undefined;

/**
 * All events
 */
const finderSkillsEvents = () => {
    getSkillsData();
};

const getSkillsData = () => {
    readJSON("/resources/json/skill.json", createSkillFinder);
};

const createSkillFinder = (data) => {
    console.log("Fill skill finder");
    console.log(data);

    navSkillItems = document.querySelectorAll(".finder__nav-item--skill");

    navSkillSelection();
}

const navSkillSelection = () => {
    if (navSkillItems.length <= 0) {
        console.error("No project item found");
        return;
    }

    for (let i = 0; i < navSkillItems.length; i++) {
        const navItem = navSkillItems[i];
        navItem.addEventListener("click", () => {
            const newActive = navItem.getAttribute("data-active");
            const currentActive = document.querySelector(
                '.finder__nav-item--skill[data-active="true"]'
            );

            if (newActive == "false") {
                navItem.setAttribute("data-active", true);
                currentActive.setAttribute("data-active", false);
                getThumbnails(i);
            }
        });
    }
}