<h1 align="center">
  <b>Bildgalleriet</b>
</h1>

<p align="center">
  A responsive image gallery built with HTML, CSS and JavaScript
</p>

<p align="center">
  <img src="https://codecov.io/gh/JocoBorghol/Bildgalleriet/branch/main/graph/badge.svg" />
  <img src="https://github.com/JocoBorghol/Bildgalleriet/actions/workflows/test-and-coverage.yml/badge.svg" />
</p>

---

## 🖼 Image Gallery

This project is a responsive image gallery where images are displayed in different categories.
Users can browse categories, filter images using tags, search for content and switch between dark and light theme.

The project is built with a focus on:
- clear structure
- simple and clean UI
- responsive design
- testable JavaScript logic

All image data is loaded dynamically from JSON files.
---

## 🌐 Live version

The project is published using GitHub Pages:

👉 https://jocoborghol.github.io/Bildgalleriet/

---

## ⚙️ Features

- Category based navigation
- Tag based filtering
- Search functionality
- Dark / Light theme
- JSON based image data
- Lazy loading of images
- Responsive layout for mobile, tablet and desktop

---

## 🧪 Tests

The project uses **Jest** to test the JavaScript logic.

Tests cover:
- filtering logic
- search functionality
- sorting
- edge cases

### Run tests locally

```bash
npm install
npm test
```

Tests are also executed automatically using GitHub Actions.

## 📊 Code coverage

Code coverage is measured using **Codecov** and updated automatically through CI.  
The badge at the top of this README shows the current coverage status.

## 🛠 Technologies

| Area | Technology |
|------|------------|
| Structure | HTML |
| Styling | CSS |
| Logic | JavaScript |
| Data | JSON |
| Testing | Jest |
| CI | GitHub Actions |
| Deployment | GitHub Pages |

---

## 📂 Project structure (overview)

- `index.html` - start page
- `*.html` - category pages
- `js/` - JavaScript logic
- `css/` - styling
- `data/` - JSON image data
- `js/utils/tests/` - Jest tests


---

## 🚀 Installation and local setup

### 1. Clone the repository

```bash
git clone https://github.com/JocoBorghol/Bildgalleriet.git
```
### 2. Open the project
Open `index.html` in your browser or use any local server.