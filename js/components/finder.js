"use strict";

var thumbnailProjects = undefined;

const finderEvents = () => {
  getData();

  // navSelection();
  rotationSelection();
};

const getData = () => {
  readJSON("/resources/json/hero.json", createHeroFinder);
};

const createHeroFinder = (data) => {
  thumbnailProjects = data;

  const heroFinder = document.querySelector("#hero-finder");
  let thumbnailNavButtons = "";

  if (thumbnailProjects.length == 0) {
    console.error("No projects found in hero.json");
  }

  // Construct finder navigation
  thumbnailProjects.forEach((thumbnail, i) => {
    console.log(thumbnail);
    let dataActive = "false";

    dataActive = i == 0 ? "true" : "false";

    thumbnailNavButtons += `<li>
        <button class="finder__nav-project" onclick="getThumbnails(${i})" data-active="${dataActive}">
          <i class="finder__nav-project-icon wf-icon-${thumbnail.icon}"></i>
          <span class="finder__nav-project-title">${thumbnail.title}</span>
        </button>
      </li>`;
  });

  heroFinder.querySelector(".finder__nav-projects").innerHTML +=
    thumbnailNavButtons;

  getThumbnails(0);
};

const getThumbnails = (id) => {
  const thumbnail = thumbnailProjects[id];
  const heroFinder = document.querySelector("#hero-finder");
  var img = "";
  
  if (thumbnail.thumbnailMobile) {
    img += `<source media="(max-width: 768px)" srcset=".\\resources\\images\\thumbnails\\${thumbnail.thumbnailMobile}"/>`;
  }

  img += `<img class="project-thumbnail" loading="lazy" src=".\\resources\\images\\thumbnails\\${thumbnail.thumbnail}" alt="${thumbnail.alt}"/>`;

  const numbers = `<span class="finder__projects-numbers">${thumbnail.title} - ${thumbnailProjects.length} ${thumbnailProjects.length == 1 ? "project" : "projects"}, 500GB available</span>`;

  heroFinder.querySelector(".finder__container-content").innerHTML = `<picture>${img}</picture>`;
  heroFinder.querySelector(".finder__container-footer").innerHTML = numbers;
};

const navSelection = (navItems) => {
  if (navItems.length <= 0) {
    console.error("No project item found");
    return;
  }

  for (let i = 0; i < navItems.length; i++) {
    const navItem = navItems[i];
    navItem.addEventListener("click", () => {
      const newActive = navItem.getAttribute("data-active");
      const currentActive = document.querySelector(
        '.finder__nav-project[data-active="true"]'
      );

      if (newActive == "false") {
        navItem.setAttribute("data-active", true);
        currentActive.setAttribute("data-active", false);
      }
    });
  }
};

const rotationSelection = () => {
  const nav = document.querySelector('[data-magnetic]');
  const navItems = nav.querySelectorAll('.finder__nav-project');

  setInterval(() => {
      for (let i = 0; i < navItems.length; i++) {
          if (i + 1 == navItems.length) {
              navItems[i].setAttribute('data-active', 'false');
              navItems[0].setAttribute('data-active', 'true');
              getThumbnails(0);
              break;
          }

          if (navItems[i].getAttribute('data-active') == 'true') {
              navItems[i].setAttribute('data-active', 'false');
              navItems[i + 1].setAttribute('data-active', 'true');
              getThumbnails(i + 1);
              break;
          }
      }
  }, 1000);
};
