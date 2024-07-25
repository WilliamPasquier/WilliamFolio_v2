"use strict";

var thumbnailProjects = undefined;
var thumbnailImages = undefined;

const finderEvents = () => {
  getData();
};

const getData = () => {
  readJSON("/resources/json/hero.json", createHeroFinder);
};

const createHeroFinder = (data) => {
  thumbnailProjects = data;

  const heroFinder = document.querySelector("#hero-finder");
  const nav = heroFinder.querySelector(".finder__nav-projects");
  const container = heroFinder.querySelector(".finder__container-content");
  const footer = heroFinder.querySelector(".finder__container-footer");
  let thumbnailNavButtons = "";
  let numbers = "";
  let images = "";

  if (thumbnailProjects.length == 0) {
    console.error("No projects found in hero.json");
    return;
  }

  // Construct finder navigation
  thumbnailProjects.forEach((thumbnail, i) => {
    thumbnailNavButtons += `<li>
        <button class="finder__nav-project" data-active="${
          i === 0 ? "true" : "false"
        }" onclick="getThumbnails(${i})">
          <i class="finder__nav-project-icon wf-icon-${thumbnail.icon}"></i>
          <span class="finder__nav-project-title">${thumbnail.title}</span>
        </button>
      </li>`;

    images += `
    <picture>
      ${
        thumbnail.thumbnailMobile
          ? `<source media="(max-width: 768px)" srcset=".\\resources\\images\\thumbnails\\${thumbnail.thumbnailMobile}" />`
          : ""
      }
      <img class="project-thumbnail" loading="lazy" src=".\\resources\\images\\thumbnails\\${
        thumbnail.thumbnail
      }" alt="${thumbnail.alt}" />
    </picture>`;
  });

  nav.insertAdjacentHTML("beforeend", thumbnailNavButtons);
  container.innerHTML = "";
  container.insertAdjacentHTML("beforeend", images);
  footer.innerHTML = "";
  footer.insertAdjacentHTML("beforeend", numbers);

  const navItems = document.querySelectorAll(".finder__nav-project");
  thumbnailImages = document.querySelectorAll(".project-thumbnail");

  getThumbnails(0);
  navSelection(navItems);
  rotationSelection(navItems);
};

const getThumbnails = (id) => {
  const thumbnail = thumbnailProjects[id];
  const heroFinder = document.querySelector("#hero-finder");
  const currentImage = heroFinder.querySelector(".project-active");
  const image = thumbnailImages[id];
  const footer = heroFinder.querySelector(".finder__container-footer");

  if (currentImage !== null) {
    currentImage.classList.remove("project-active");
  }
  image.classList.add("project-active");

  const numbers = `<span class="finder__projects-numbers">${
    thumbnail.title
  } - ${thumbnailProjects.length} ${
    thumbnailProjects.length == 1 ? "project" : "projects"
  }, 500GB available</span>`;

  footer.innerHTML = "";
  footer.insertAdjacentHTML("beforeend", numbers);
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
        getThumbnails(i);
      }
    });
  }
};

const rotationSelection = (navItems) => {
  setInterval(() => {
    for (let i = 0; i < navItems.length; i++) {
      if (i + 1 == navItems.length) {
        navItems[i].setAttribute("data-active", "false");
        navItems[0].setAttribute("data-active", "true");
        getThumbnails(0);
        break;
      }

      if (navItems[i].getAttribute("data-active") == "true") {
        navItems[i].setAttribute("data-active", "false");
        navItems[i + 1].setAttribute("data-active", "true");
        getThumbnails(i + 1);
        break;
      }
    }
  }, 5000);
};
