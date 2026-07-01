const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const currentPage = document.body.dataset.page;

if (currentPage) {
  document.querySelectorAll(".site-nav a").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
}
