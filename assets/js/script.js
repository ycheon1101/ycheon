'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation + URL sync (paths like /ycheon/projects on GitHub Pages)
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const PAGE_KEYS = new Set([
  "about",
  "publications",
  "ongoing",
  "projects",
  "contact",
  "project-detail",
]);

function normalizePathname() {
  let p = window.location.pathname;
  if (p.endsWith("/index.html")) {
    p = p.slice(0, -"/index.html".length) || "/";
  }
  return p.replace(/\/$/, "") || "/";
}

function computeAppBase() {
  const pathname = normalizePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && PAGE_KEYS.has(segments[segments.length - 1])) {
    segments.pop();
  }
  if (segments.length === 0) return "/";
  return "/" + segments.join("/") + "/";
}

const appBase = computeAppBase();

function getPageFromPath() {
  const pathname = normalizePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && PAGE_KEYS.has(segments[segments.length - 1])) {
    return segments[segments.length - 1];
  }
  return "about";
}

function buildPageUrl(pageKey) {
  if (pageKey === "about") {
    if (appBase === "/") return "/";
    return appBase.replace(/\/$/, "") || "/";
  }
  if (appBase === "/") {
    return "/" + pageKey;
  }
  return appBase.replace(/\/$/, "") + "/" + pageKey;
}

function setActivePage(pageKey) {
  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.toggle("active", pages[i].dataset.page === pageKey);
  }
  for (let i = 0; i < navigationLinks.length; i++) {
    const label = navigationLinks[i].innerHTML.toLowerCase();
    const navMatch =
      pageKey === "project-detail" ? label === "projects" : label === pageKey;
    navigationLinks[i].classList.toggle("active", navMatch);
  }
  window.scrollTo(0, 0);
}

function showPage(pageKey, options) {
  const replace = options && options.replace;
  const skipHistory = options && options.skipHistory;
  setActivePage(pageKey);
  if (skipHistory) return;
  const url = buildPageUrl(pageKey);
  if (replace) {
    history.replaceState({ page: pageKey }, "", url);
  } else {
    history.pushState({ page: pageKey }, "", url);
  }
}

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageKey = this.innerHTML.toLowerCase();
    showPage(pageKey);
  });
}

window.addEventListener("popstate", function () {
  showPage(getPageFromPath(), { skipHistory: true });
});

// project pdf view variables
const projectPdfTriggers = document.querySelectorAll("[data-open-project-pdf]");
const projectPdfFrame = document.querySelector("[data-project-pdf-frame]");
const projectBackBtn = document.querySelector("[data-project-back-btn]");

for (let i = 0; i < projectPdfTriggers.length; i++) {
  projectPdfTriggers[i].addEventListener("click", function (event) {
    event.preventDefault();
    const pdfSrc = this.getAttribute("data-open-project-pdf");
    if (projectPdfFrame) projectPdfFrame.src = pdfSrc;
    showPage("project-detail");
  });
}

if (projectBackBtn) {
  projectBackBtn.addEventListener("click", function () {
    showPage("projects");
  });
}

document.querySelectorAll('[data-page="publications"] .blog-post-item > a[href="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
  });
});

const initialPage = getPageFromPath();
showPage(initialPage, { skipHistory: true });

if (initialPage === "about") {
  const segments = normalizePathname().split("/").filter(Boolean);
  if (segments.length && segments[segments.length - 1] === "about") {
    history.replaceState({ page: "about" }, "", buildPageUrl("about"));
  }
}