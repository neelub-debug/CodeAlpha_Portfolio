document.documentElement.classList.add("js");

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Reveal sections as they scroll into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Typing effect in the hero
const typed = document.getElementById("typed");
const roles = ["Web Developer", "BS IT Student", "Frontend Intern at CodeAlpha"];

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typed.textContent = roles[0];
} else {
  let roleIndex = 0;
  let charCount = 0;
  let deleting = false;

  (function type() {
    const word = roles[roleIndex];
    charCount += deleting ? -1 : 1;
    typed.textContent = word.slice(0, charCount);

    let delay = deleting ? 40 : 90;
    if (!deleting && charCount === word.length) {
      deleting = true;
      delay = 1400;
    } else if (deleting && charCount === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }
    setTimeout(type, delay);
  })();
}