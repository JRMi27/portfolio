// Immovanta — interactions de la page

// --- Menu mobile ---
const burger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});

navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
});

// --- Slider réalisations ---
const slides = Array.from(document.querySelectorAll(".slide"));
const slideIndexEl = document.getElementById("slideIndex");
let current = 0;

function showSlide(i) {
  current = (i + slides.length) % slides.length;
  slides.forEach((s, idx) => s.classList.toggle("is-active", idx === current));
  slideIndexEl.textContent = String(current + 1).padStart(2, "0");
}

document.getElementById("slidePrev").addEventListener("click", () => showSlide(current - 1));
document.getElementById("slideNext").addEventListener("click", () => showSlide(current + 1));

// --- Apparition au défilement ---
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

// --- Formulaire de rendez-vous (démonstration, à connecter plus tard) ---
const form = document.getElementById("bookingForm");
const success = document.getElementById("formSuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  success.hidden = false;
  form.querySelector("button[type=submit]").disabled = true;
});
