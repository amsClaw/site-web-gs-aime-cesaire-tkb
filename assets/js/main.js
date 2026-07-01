/* ─────────────────────────────────────
   Taste Skill v2 — main.js
   Navigation, lightbox, current page
   ───────────────────────────────────── */

(function () {
  "use strict";

  // ── Navigation mobile ──

  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Fermer le menu au clic sur un lien
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ── Page courante ──

  const currentPage = document.body.dataset.page;

  if (currentPage) {
    document.querySelectorAll(".site-nav a").forEach((link) => {
      if (link.dataset.page === currentPage) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  // ── Lightbox Galerie ──

  const galleryLinks = document.querySelectorAll(".gallery-item");
  if (galleryLinks.length) {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-label", "Aperçu de l'image");
    lb.innerHTML =
      '<button class="lightbox-close" aria-label="Fermer">&times;</button>' +
      '<img src="" alt="">' +
      '<p class="lightbox-caption"></p>';
    document.body.appendChild(lb);

    const lbImg = lb.querySelector("img");
    const lbCaption = lb.querySelector(".lightbox-caption");
    const lbClose = lb.querySelector(".lightbox-close");

    function openLightbox(imgSrc, caption) {
      lbImg.src = imgSrc;
      lbCaption.textContent = caption;
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
    }

    galleryLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const img = link.querySelector("img");
        const caption = link.dataset.caption || "";
        if (img) openLightbox(img.src, caption);
      });
    });

    lbClose.addEventListener("click", closeLightbox);
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lb.classList.contains("open")) closeLightbox();
    });
  }

  // ── Apparition douce au scroll (optionnel sur les sections) ──

  // On utilise IntersectionObserver pour ajouter un fade-in
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".card, .feature, .gallery-item, .split img, .step").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });
  }
})();
