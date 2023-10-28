// Funkcja do wyświetlania ekranu ładowania
function showLoader() {
  document.getElementById("loader-container").style.display = "grid";
}

// Funkcja do ukrywania ekranu ładowania
function hideLoader() {
  document.getElementById("loader-container").style.display = "none";
}

// Zdarzenie "beforeunload" - wyzwalane przed opuszczeniem strony
window.addEventListener("unload", function () {
  this.setTimeout(() => {
    showLoader();
  }, 1000); // Wyświetl ekran ładowania przed opuszczeniem strony
});

// Zdarzenie "DOMContentLoaded" - wyzwalane po wczytaniu całej zawartości strony
document.addEventListener("DOMContentLoaded", function () {
  hideLoader(); // Ukryj ekran ładowania po załadowaniu całej zawartości strony
});
