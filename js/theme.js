document.addEventListener("DOMContentLoaded", () => {
  // Root-element
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");

  // Avbryt om knapp saknas
  if (!themeToggle) return;

  // Läs sparat tema eller light
  const savedTheme = localStorage.getItem("theme") || "dark";
  root.setAttribute("data-theme", savedTheme);

  // Sätt ikon direkt
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  // Växla tema vid klick
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    // Uppdatera tema
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);

    // Uppdatera ikon
    themeToggle.textContent = nextTheme === "dark" ? "☀️" : "🌙";
  });
});