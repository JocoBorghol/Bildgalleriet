document.addEventListener("DOMContentLoaded", () => {
  // Grid för showcase
  const showcaseGrid = document.getElementById("showcaseGrid");
  if (!showcaseGrid) return;

  // Svenska namn på kategorier
  const categoryLabels = {
    jellyfish: "Maneter",
    penguin: "Pingviner",
    parrot: "Papegojor",
    eagle: "Örnar"
  };

  // Reservtexter per kategori
  const fallbackTexts = {
    jellyfish: [
      "Drivande liv i stillhet.",
      "Ljus som rör sig långsamt.",
      "Tyst rytm i djupet."
    ],
    penguin: [
      "Rörelse i kyla.",
      "Gemenskap vid havets kant.",
      "Liv där is möter vatten."
    ],
    parrot: [
      "Färg och närvaro.",
      "Rörelse bland grenar.",
      "Ett ögonblick av ljud."
    ],
    eagle: [
      "Höjd och fokus.",
      "Stillhet före rörelse.",
      "Frihet i luften."
    ]
  };

  // Kategorier som visas
  const categories = ["jellyfish", "penguin", "parrot", "eagle"];
  const showcaseItems = [];

  // Ladda bilddata
  fetch("data/gallery.json")
    .then(res => res.json())
    .then(images => {
      categories.forEach(category => {
        const candidates = images.filter(
          img => img.category === category
        );

        pickRealLandscape(candidates, category);
      });
    });

  // Hitta första liggande bild
  function pickRealLandscape(images, category) {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    let index = 0;

    function tryNext() {
      if (index >= shuffled.length) {
        checkAndRender();
        return;
      }

      const img = shuffled[index];
      const testImage = new Image();
      testImage.src = img.src.replace("/thumb/", "/full/");

      testImage.onload = () => {
        if (testImage.naturalWidth > testImage.naturalHeight) {
          showcaseItems.push(buildShowcaseItem(category, img));
          checkAndRender();
        } else {
          index++;
          tryNext();
        }
      };

      testImage.onerror = () => {
        index++;
        tryNext();
      };
    }

    tryNext();
  }

  // Rendera när alla är klara
  function checkAndRender() {
    if (showcaseItems.length !== categories.length) return;

    shuffleArray(showcaseItems).forEach(item => {
      showcaseGrid.appendChild(item);
    });
  }

  // Bygg ett showcase-kort
  function buildShowcaseItem(category, img) {
    const article = document.createElement("article");
    article.className = "showcase-item";
    article.dataset.category = category;

    const link = document.createElement("a");
    link.href = `${category}.html`;

    const image = document.createElement("img");
    image.src = img.src.replace("/thumb/", "/full/");
    image.alt = img.alt || "";
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "showcase-content";

    const title = document.createElement("h2");
    title.textContent = categoryLabels[category] || category;

    const text = document.createElement("p");
    text.textContent =
      img.text ||
      fallbackTexts[category][
        Math.floor(Math.random() * fallbackTexts[category].length)
      ];

    content.appendChild(title);
    content.appendChild(text);

    link.appendChild(image);
    article.appendChild(link);
    article.appendChild(content);

    return article;
  }

  // Blanda ordning
  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
});