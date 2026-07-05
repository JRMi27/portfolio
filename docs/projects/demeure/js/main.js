/* Demeure — interactions légères, sans dépendance */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Header : filet au scroll ---------- */
  var header = document.querySelector(".site-header");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  if (header) {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Apparition au scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Compteurs animés ---------- */
  var counters = document.querySelectorAll(".stat-num[data-count]");

  function renderCounter(el, value) {
    var suffix = el.getAttribute("data-suffix") || "";
    el.textContent = value.toLocaleString("fr-FR") + suffix;
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1300;
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3); /* easeOutCubic */
      renderCounter(el, Math.round(target * eased));
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  if (prefersReduced || !("IntersectionObserver" in window)) {
    counters.forEach(function (el) {
      renderCounter(el, parseInt(el.getAttribute("data-count"), 10) || 0);
    });
  } else {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Formulaire (démo — à connecter) ---------- */
  var form = document.getElementById("booking-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var success = form.querySelector(".form-success");
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ block: "nearest", behavior: prefersReduced ? "auto" : "smooth" });
      }
      form.reset();
    });
  }

  /* ---------- Année courante ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
