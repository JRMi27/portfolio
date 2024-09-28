let iconMenu = document.querySelector(".bodymovinanim");

let animationMenu = bodymovin.loadAnimation({
  container: iconMenu,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "assets/menuV4",
});

var directionMenu = 1;
iconMenu.addEventListener("click", (e) => {
  animationMenu.setDirection(directionMenu);
  animationMenu.play();
  directionMenu = -directionMenu; // Inverse la direction de l'animation à chaque clic
});

document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const textArray = [
    "Bienvenue sur mon Portfolio",
    "Welcome on my Portfolio",
    "Wilkommen in meinem Portfolio",
    "Bienvenido a mi portafolio",
    "私のポートフォリオへようこそ",
  ];
  const typingSpeed = 100; // Vitesse de frappe (en millisecondes)
  const erasingSpeed = 50; // Vitesse d'effacement (en millisecondes)
  const delayBetweenTexts = 2000; // Temps entre les textes (en millisecondes)

  let currentIndex = 0;
  let charIndex = 0;
  let isErasing = false;

  const typedTextElement = document.querySelector(".typed-text");

  function typeText() {
    if (!isErasing && charIndex < textArray[currentIndex].length) {
      typedTextElement.textContent += textArray[currentIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeText, typingSpeed);
    } else if (isErasing && charIndex > 0) {
      typedTextElement.textContent = textArray[currentIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(typeText, erasingSpeed);
    } else {
      isErasing = !isErasing;
      if (!isErasing) {
        currentIndex = (currentIndex + 1) % textArray.length;
      }
      setTimeout(typeText, delayBetweenTexts);
    }
  }

  setTimeout(typeText, delayBetweenTexts);
});

// Récupère tous les boutons de filtre
const filterButtons = document.querySelectorAll(".filter-btn");

// Récupère toutes les cartes de certificats
const certCards = document.querySelectorAll(".row .col-md-4");

// Ajoute un événement sur chaque bouton de filtre
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Récupère la catégorie à filtrer
    const filter = button.getAttribute("data-filter");

    // Affiche/masque les cartes en fonction du filtre
    certCards.forEach((card) => {
      if (filter === "all") {
        // Si "TOUS" est sélectionné, on affiche toutes les cartes
        card.style.display = "block";
      } else if (card.classList.contains(filter)) {
        // Sinon, on affiche seulement les cartes qui appartiennent à la catégorie
        card.style.display = "block";
      } else {
        // On masque les cartes qui n'appartiennent pas à la catégorie
        card.style.display = "none";
      }
    });

    // Ajoute une classe "active" au bouton sélectionné
    filterButtons.forEach((btn) => btn.classList.remove("btn-dark"));
    button.classList.add("btn-dark");
  });
});

// Fonction pour détecter la section active au fur et à mesure du défilement
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner toutes les sections que l'on souhaite observer
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  // Fonction pour ajouter la classe active à l'élément de la nav correspondant à la section visible
  function activateNavLink(id) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
  }

  // Observer l'intersection des sections avec la fenêtre
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          activateNavLink(sectionId);
        }
      });
    },
    {
      threshold: 0.3, // Seuil pour déclencher l'observation (30% de la section visible)
    }
  );

  // Observer chaque section
  sections.forEach((section) => {
    observer.observe(section);
  });
});
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebarToggle");

toggleBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

AOS.init({
  startEvent: "DOMContentLoaded",
  easing: "ease-in-out",
  delay: 100,
  disable: function () {
    return window.innerWidth < 1080;
  },
});
let iconDownload = document.querySelector(".bodymovinanim1");

let animationDownload = bodymovin.loadAnimation({
  container: iconDownload,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "assets/download.json",
});

iconDownload.addEventListener("click", function () {
  animationDownload.playSegments([0, 60], true);
});

let iconMail = document.querySelector(".bodymovinanim2");

let animationMail = bodymovin.loadAnimation({
  container: iconMail,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "assets/mail.json",
});

var directionMail = 1;
iconMail.addEventListener("mouseenter", (e) => {
  animationMail.setDirection(directionMail);
  animationMail.play();
});

iconMail.addEventListener("mouseleave", (e) => {
  animationMail.setDirection(-directionMail);
  animationMail.play();
});
let iconGit = document.querySelector(".bodymovinanim3");

let animationgit = bodymovin.loadAnimation({
  container: iconGit,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "assets/github.json",
});

var directionGit = 1;
iconGit.addEventListener("mouseenter", (e) => {
  animationgit.setDirection(directionGit);
  animationgit.play();
});

iconGit.addEventListener("mouseleave", (e) => {
  animationgit.setDirection(-directionGit);
  animationgit.play();
});
let iconLink = document.querySelector(".bodymovinanim4");

let animationlink = bodymovin.loadAnimation({
  container: iconLink,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "assets/linkedin.json",
});

var directionLink = 1;
iconLink.addEventListener("mouseenter", (e) => {
  animationlink.setDirection(directionLink);
  animationlink.play();
});

iconLink.addEventListener("mouseleave", (e) => {
  animationlink.setDirection(-directionLink);
  animationlink.play();
});
let iconExplore = document.querySelector(".bodymovinanim5");

let animationExplore = bodymovin.loadAnimation({
  container: iconExplore,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "assets/Explore.json",
});

var directionExplore = 1;
iconExplore.addEventListener("mouseenter", (e) => {
  animationExplore.setDirection(directionExplore);
  animationExplore.play();
});

iconExplore.addEventListener("mouseleave", (e) => {
  animationExplore.setDirection(-directionExplore);
  animationExplore.play();
});
