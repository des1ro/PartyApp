const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("navbar-scroll-up");
  } else {
    navbar.classList.remove("navbar-scroll-up");
  }
});
