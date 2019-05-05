"use strict"

const mainNav = document.querySelector(".main-nav");
const mainNavToggle = mainNav.querySelector(".main-nav__toggle");

const buyButtons = document.querySelectorAll(".product-card__buy");
const overlay = document.querySelector(".overlay");
const toCartPopup = document.querySelector(".to-cart");
const toCartPopupControls = toCartPopup.querySelectorAll(".options-controls__btn");
const toCartPopupSubmitBtn = toCartPopup.querySelector(".to-cart__submit-btn");
const leaderBtn = document.querySelector(".leader__btn");

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

if (leaderBtn) {
  leaderBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    overlay.classList.toggle("overlay--show");
    toCartPopup.classList.toggle("to-cart--show");
    toCartPopupControls[0].focus();
  });
}

buyButtons.forEach(function (button) {
  button.addEventListener("click", function (evt) {
    evt.preventDefault();
    overlay.classList.toggle("overlay--show");
    toCartPopup.classList.toggle("to-cart--show");
    toCartPopupControls[0].focus();
  });
});

toCartPopupControls.forEach(function (control) {
  control.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      overlay.classList.toggle("overlay--show");
      toCartPopup.classList.toggle("to-cart--show");
    }
  });
});

toCartPopupSubmitBtn.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    overlay.classList.toggle("overlay--show");
    toCartPopup.classList.toggle("to-cart--show");
  }
});

overlay.addEventListener("click", function () {
  overlay.classList.toggle("overlay--show");
  toCartPopup.classList.toggle("to-cart--show");
});
