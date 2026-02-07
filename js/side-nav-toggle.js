document.addEventListener("DOMContentLoaded", () => {
  // Toggle-knapp
  const toggleBtn = document.getElementById("sideNavToggle");
  const layout = document.querySelector(".layout");

  // Avbryt om något saknas
  if (!toggleBtn || !layout) return;

  // Visa eller dölj sidomeny
  toggleBtn.addEventListener("click", () => {
    const isHidden = layout.classList.toggle("is-side-nav-hidden");

    // Uppdatera aria-status
    toggleBtn.setAttribute("aria-expanded", String(!isHidden));
  });
});