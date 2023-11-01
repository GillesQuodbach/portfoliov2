"use strict";

const overlay = document.querySelector(".overlay");

//Sections
const sectionHome = document.querySelector("#section-home");
const sectionAboutMe = document.querySelector("#section-aboutme");
const sectionProjects = document.querySelector("#section-projects");
const sectionContact = document.querySelector("#section-contact");

//Navigation
const navContainer = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav_link");
const btnScrollTo = document.querySelector(".btn-scroll-to");

//Modal
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".btn-close-modal");
const btnOpenModal = document.querySelectorAll(".btn-show-modal");
//! LEARN MORE BUTTON
btnScrollTo.addEventListener("click", function (e) {
  const sectionAboutMeCoords = sectionAboutMe.getBoundingClientRect();
  sectionAboutMe.scrollIntoView({ behavior: "smooth" });
});

//! NAV LINKS
document.querySelector(".nav_links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav_link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    e.target.classList.remove("active");
    e.target.classList.add("active");
  }
});

//! Sticky header
const header = document.querySelector(".header");
const navHeight = navContainer.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navContainer.classList.add("sticky");
  else navContainer.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//! Modal
const openModal = function (e) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//! Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider_btn-left");
  const btnRight = document.querySelector(".slider_btn-right");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots_dot" data-slide="${i}"</button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll(".dots_dot")
      .forEach((dot) => dot.classList.remove("dots_dot_active"));
    document
      .querySelector(`.dots_dot[data-slide="${slide}"]`)
      .classList.add("dots_dot_active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activeDot(0);
  };

  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots_dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(currentSlide);
    }
  });
};

slider();

//! Contact form

//Emailjs init
(function () {
  emailjs.init("cVy7VyizmeAS-jMc7");
})();

//Manage form
document
  .querySelector("#contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("form submited");

    emailjs.sendForm("service_4xh5k5l", "template_mg03i1v", this).then(
      function () {
        console.log("SUCCESS!");
        openModal();
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Oups, it was an error, please try again");
      }
    );
  });
