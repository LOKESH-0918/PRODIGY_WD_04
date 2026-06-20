const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = Array.from(siteNav.querySelectorAll("a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const typedRole = document.getElementById("typedRole");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const roles = ["Web Developer", "Frontend Learner", "JavaScript Developer", "Student Developer"];
let roleIndex = 0;
let letterIndex = 0;
let deleting = false;

function updateHeader() {
  siteHeader.classList.toggle("scrolled", window.scrollY > 24);
}

function closeMenu() {
  siteNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function updateActiveLink() {
  let currentSectionId = "home";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 130) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.hash === `#${currentSectionId}`);
  });
}

function typeRole() {
  const currentRole = roles[roleIndex];
  typedRole.textContent = currentRole.slice(0, letterIndex);

  if (!deleting && letterIndex < currentRole.length) {
    letterIndex += 1;
    window.setTimeout(typeRole, 90);
    return;
  }

  if (!deleting && letterIndex === currentRole.length) {
    deleting = true;
    window.setTimeout(typeRole, 1200);
    return;
  }

  if (deleting && letterIndex > 0) {
    letterIndex -= 1;
    window.setTimeout(typeRole, 45);
    return;
  }

  deleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  window.setTimeout(typeRole, 220);
}

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  updateHeader();
  updateActiveLink();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Message sent successfully.";
  contactForm.reset();
});

updateHeader();
updateActiveLink();
typeRole();
