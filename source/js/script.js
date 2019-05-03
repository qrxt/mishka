"use strict"

const mainNav = document.querySelector(".main-nav");
const mainNavToggle = mainNav.querySelector(".main-nav__toggle");

mainNav.classList.remove("main-nav--nojs");

mainNavToggle.addEventListener("click", function () {
  if (mainNavToggle.classList.contains("burger-menu--opened")) {
    mainNavToggle.setAttribute("aria-label", "Открыть меню навигации");
  } else {
    mainNavToggle.setAttribute("aria-label", "Закрыть меню навигации");
  }

  mainNavToggle.classList.toggle("burger-menu--opened");
  mainNav.classList.toggle("main-nav--opened");
});
