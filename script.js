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
  const textArray = ["Bienvenue sur mon Portfolio"];
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
