// Filtrera bilder baserat på kategori, tagg och sökterm
export function filterImages(images, { category = null, activeTag = null, query = "" }) {
  const q = query.toLowerCase().trim();

  return images.filter(img => {
    const categoryMatch = !category || img.category === category;

    const tagMatch =
      !activeTag ||
      img.tags.some(t => t.toLowerCase() === activeTag.toLowerCase());

    const searchMatch =
      q === "" ||
      img.tags.some(t => t.toLowerCase().includes(q));

    return categoryMatch && tagMatch && searchMatch;
  });
}

// Sortera porträtt före liggande
export function sortByOrientation(a, b) {
  if (a.orientation === b.orientation) return 0;
  return a.orientation === "portrait" ? -1 : 1;
}

// Hämta batch av bilder
export function getVisibleImages(images, count) {
  return images.slice(0, count);
}