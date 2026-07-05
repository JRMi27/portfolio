// Interactions de la page : modale de rendez-vous, menu mobile, apparitions au scroll.
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Modale de rendez-vous ---------- */

  var modal = document.getElementById("booking-modal");
  var panel = modal.querySelector(".modal-panel");
  var form = modal.querySelector(".booking-form");
  var success = modal.querySelector(".form-success");
  var lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var firstField = modal.querySelector("input");
    if (firstField) firstField.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll("[data-booking], [data-booking-link]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      openModal();
    });
  });

  modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  // Piège à focus simple : Tab reste dans la modale tant qu'elle est ouverte.
  modal.addEventListener("keydown", function (event) {
    if (event.key !== "Tab" || modal.hidden) return;
    var focusables = panel.querySelectorAll(
      "button, input, textarea, a[href], [tabindex]:not([tabindex='-1'])"
    );
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // Placeholder : pas d'envoi réel tant que le backend / Calendly n'est pas branché.
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    success.hidden = false;
    form.reset();
  });

  /* ---------- Menu mobile ---------- */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Apparition au scroll ---------- */

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealed = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealed.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealed.forEach(function (el) { observer.observe(el); });
  }
})();
