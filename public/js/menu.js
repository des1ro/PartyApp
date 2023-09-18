document.addEventListener("DOMContentLoaded", function () {
  const logoContainer = document.getElementById("logoContainer");
  const menu = document.getElementById("menu");

  logoContainer.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Dodaj obsługę kliknięcia na inny obszar strony, aby ukryć menu poza nim
  document.addEventListener("click", (e) => {
    if (!logoContainer.contains(e.target)) {
      menu.classList.remove("active");
    }
  });
});
