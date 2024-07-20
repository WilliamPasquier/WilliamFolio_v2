"use strict";
const supportsAnchorPos = ("anchorName" in document.documentElement.style);

const finderEvents = () => {
    const nav = document.querySelector('[data-magnetic]');
    const navItems = nav.querySelectorAll('.finder__nav-project');

    navSelection(navItems);
}


const navSelection = (navItems) => {
    for (let i = 0; i < navItems.length; i++) {
        const navItem = navItems[i]
        navItem.addEventListener('click', () => {
            const newActive = navItem.getAttribute('data-active');
            const currentActive = document.querySelector('.finder__nav-project[data-active="true"]');

            if (newActive == "false") {
                navItem.setAttribute('data-active', true);
                currentActive.setAttribute('data-active', false);
            }
        })
    }
}
