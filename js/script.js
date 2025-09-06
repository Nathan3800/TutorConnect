document.addEventListener("DOMContentLoaded", function () {
  const modeToggle = document.getElementById("modeToggle");
  modeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
});
