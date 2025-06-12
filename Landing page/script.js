'use strict';
  const nav = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });


const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    const sectionTop = sections[i].getBoundingClientRect().top;
    const triggerPoint = window.innerHeight / 1.3;

    if (sectionTop < triggerPoint) {
      sections[i].classList.add("revealed");
    } else {
      sections[i].classList.remove("revealed");
    }
  }
};

scrollReveal(); // Run on page load


window.addEventListener("scroll", scrollReveal);

const toggleBtn = document.getElementById('mobile-nav-toggle');
const sideNav = document.getElementById('side-nav');
const closeBtn = document.getElementById('close-btn');

toggleBtn.addEventListener('click', () => {
  sideNav.style.width = '250px';
});

closeBtn.addEventListener('click', () => {
  sideNav.style.width = '0';
});