
window.onload = function () {
  alert("Ласкаво просимо до Оптика Центр Зору!");
};


function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const btn = document.getElementById("theme-btn");
  btn.textContent = body.classList.contains("dark-mode") 
    ? "Увімкнути світлу тему" 
    : "Увімкнути темну тему";
}
