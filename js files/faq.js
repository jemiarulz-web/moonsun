/* =========================================
MOONSUN FAQ JAVASCRIPT
========================================= */


/* =========================================
FAQ ACCORDION
========================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {

    const isActive = item.classList.contains("active");


    // Close all other questions
    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");

      const button = otherItem.querySelector(".faq-question");

      button.setAttribute("aria-expanded", "false");
    });


    // Open clicked question
    if (!isActive) {

      item.classList.add("active");

      question.setAttribute("aria-expanded", "true");

    }

  });

});


/* =========================================
MOBILE MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const closeMenu = document.querySelector(".close-menu");

menuToggle.addEventListener("click", () => {

  mobileNav.classList.add("active");

  document.body.style.overflow = "hidden";

});


closeMenu.addEventListener("click", () => {

  mobileNav.classList.remove("active");

  document.body.style.overflow = "";

});


/* Close mobile menu when a link is clicked */

const mobileLinks = document.querySelectorAll(".mobile-nav a");

mobileLinks.forEach((link) => {

  link.addEventListener("click", () => {

    mobileNav.classList.remove("active");

    document.body.style.overflow = "";

  });

});


/* =========================================
SIMPLE SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
  ".faq-item, .section-heading, .cta h2, .cta p, .cta-button"
);

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
  {
    threshold: 0.1
  }
);


revealElements.forEach((element) => {

  element.style.opacity = "0";

  element.style.transform = "translateY(25px)";

  element.style.transition =
    "opacity 0.8s ease, transform 0.8s ease";

  observer.observe(element);

});


/* =========================================
FAQ KEYBOARD ACCESSIBILITY
========================================= */

faqItems.forEach((item) => {

  const question = item.querySelector(".faq-question");

  question.setAttribute("aria-expanded", "false");

});