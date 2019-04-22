const mainNav = document.querySelector(".main-nav");
const mainNavToggle = mainNav.querySelector(".main-nav__toggle");

mainNav.classList.remove("main-nav--nojs");

mainNavToggle.addEventListener("click", function () {
  /*
  if (mainNavToggle.classList.contains("main-nav__toggle--closed")) {
    mainNavToggle.setAttribute("aria-label", "Закрыть меню навигации");
  } else {
    mainNavToggle.setAttribute("aria-label", "Открыть меню навигации");
  }
  */

  mainNavToggle.classList.toggle("main-nav__toggle--closed");
  mainNavToggle.classList.toggle("main-nav__toggle--opened");

  mainNav.classList.toggle("main-nav--opened");
});
