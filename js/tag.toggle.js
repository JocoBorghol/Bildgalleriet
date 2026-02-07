// Toggle för taggfilter

document.addEventListener("DOMContentLoaded", () => {
  // Knappar och container
  const toggleBtn = document.getElementById("toggleTagsBtn");
  const tagFilters = document.getElementById("tagFilters");
  const resetBtn = document.getElementById("resetFiltersBtn");

  // Avbryt om något saknas
  if (!toggleBtn || !tagFilters || !resetBtn) return;

  // Visa eller dölj taggar
  toggleBtn.addEventListener("click", () => {
    const isHidden = tagFilters.classList.toggle("is-hidden");

    // Visa eller dölj återställningsknapp
    resetBtn.classList.toggle("is-hidden", isHidden);

    // Uppdatera knapptext
    toggleBtn.textContent = isHidden
      ? "Taggar"
      : "Dölj taggar";

    // Uppdatera aria-status
    toggleBtn.setAttribute("aria-expanded", String(!isHidden));
  });
});