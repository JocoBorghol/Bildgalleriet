import {
  filterImages,
  sortByOrientation,
  getVisibleImages
} from "./utils/gallery-utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // DOM-referenser
  const galleryGrid = document.getElementById("galleryGrid");
  const gallerySection = document.querySelector(".gallery");
  const searchInput = document.getElementById("searchInput");
  const tagContainer = document.getElementById("tagFilters");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const loadMoreMessage = document.getElementById("loadMoreMessage");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  const ANIMAL_TAGS = ["manet", "pingvin", "papegoja", "örn"];

  // Säkerhetskontroll
  if (!galleryGrid || !gallerySection) {
    console.error("Gallery container not found.");
    return;
  }

  // Aktiv kategori från sidan
  const category = gallerySection.dataset.category || null;

  // Pagination
  const IMAGES_PER_BATCH = 8;
  let visibleCount = IMAGES_PER_BATCH;

  // State
  let allImages = [];
  let filteredImages = [];
  let activeTag = null;

  // Reservtexter
  const universalTexts = [
    "Ljus i rörelse",
    "Stillhet och form",
    "Ett ögonblick",
    "Naturens rytm"
  ];

  // Hämta JSON-data
  fetch("data/gallery.json")
  .then(res => res.json())
  .then(images => {
    const categoryImages = category
      ? images.filter(img => img.category === category)
      : images;

    allImages = categoryImages;
    filteredImages = [...categoryImages].sort(sortByOrientation);

    renderTags(categoryImages); //endast taggar för aktuell kategori
    renderGallery();
  });


  // Rendera galleri
  function renderGallery() {
    galleryGrid.innerHTML = "";

    const visibleImages = getVisibleImages(filteredImages, visibleCount);

    visibleImages.forEach((img, index) => {
      const isNew = index >= visibleCount - IMAGES_PER_BATCH;

      const link = document.createElement("a");
      link.href = img.src.replace("/thumb/", "/full/");
      link.target = "_blank";
      link.rel = "noopener";
      link.className = "gallery-item";
      link.classList.add(img.orientation);

      if (isNew) {
        link.classList.add("is-new");
      }

      const image = document.createElement("img");
      image.src = img.src;
      image.alt = img.alt || "";
      image.loading = "lazy";

      const text = document.createElement("span");
      text.className = "gallery-text";
      text.dataset.position = index % 2 === 0 ? "overlay" : "below";
      text.textContent =
        img.text?.trim() ||
        universalTexts[index % universalTexts.length];

      link.appendChild(image);
      link.appendChild(text);
      galleryGrid.appendChild(link);
    });
  }

  // Ladda fler bilder
  loadMoreBtn?.addEventListener("click", () => {
    if (visibleCount >= filteredImages.length) {
      if (loadMoreMessage) {
        loadMoreMessage.textContent =
          "Det finns inga fler bilder att visa just nu.";
      }
      return;
    }

    visibleCount += IMAGES_PER_BATCH;
    renderGallery();

    if (loadMoreMessage) {
      loadMoreMessage.textContent = "";
    }
  });

  // Sökfält
  searchInput?.addEventListener("input", applyFilters);

// Rendera taggar
function renderTags(images) {
  if (!tagContainer) return;

  const tags = new Set();

  images.forEach(img => {
    img.tags.forEach(tag => {

      //gallery.html begränsas
      if (category === null) {
        if (ANIMAL_TAGS.includes(tag)) {
          tags.add(tag);
        }
      } else {
        //Kategorisidor: exakt som förr
        tags.add(tag);
      }

    });
  });

  tagContainer.innerHTML = "";

  tags.forEach(tag => {
    const btn = document.createElement("button");
    btn.textContent = tag;
    btn.classList.add("tag");

    btn.addEventListener("click", () => {
      activeTag = activeTag === tag ? null : tag;
      updateActiveTag();
      applyFilters();
    });

    tagContainer.appendChild(btn);
  });
}

  // Uppdatera aktiv tagg
  function updateActiveTag() {
    document.querySelectorAll(".tag").forEach(btn => {
      btn.classList.toggle("active", btn.textContent === activeTag);
    });
  }

  // Applicera filter (NU VIA utils)
  function applyFilters() {
    filteredImages = filterImages(allImages, {
      category,
      activeTag,
      query: searchInput?.value || ""
    }).sort(sortByOrientation);

    visibleCount = IMAGES_PER_BATCH;
    renderGallery();

    if (loadMoreMessage) {
      loadMoreMessage.textContent = "";
    }
  }

  // Återställ filter
  resetFiltersBtn?.addEventListener("click", () => {
    activeTag = null;

    if (searchInput) {
      searchInput.value = "";
    }

    document.querySelectorAll(".tag").forEach(btn => {
      btn.classList.remove("active");
    });

    applyFilters();
  });
});