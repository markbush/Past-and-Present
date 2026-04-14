# Past and Present

A static website for comparing historical satellite imagery using an interactive slider. This project is built to be hosted on GitHub Pages and supports multiple image comparisons per page with a responsive, modern aesthetic.

## 🛠 Tools & Technologies

- **[Eleventy (11ty)](https://www.11ty.dev/):** A powerful and flexible static site generator used to transform Markdown and Nunjucks templates into the final site.
- **[Pico.css](https://picocss.com/):** A minimalist, semantic CSS framework that provides a clean, "rich" aesthetic with zero configuration.
- **Custom Web Component:** A bespoke `<image-comparison-slider>` component built with Vanilla JS and Shadow DOM to handle interactive comparisons reliably, even with multiple instances on a single page.

## 📂 Project Structure

- `src/`: The root source directory.
  - `_includes/layouts/`: Nunjucks templates for the site's layout (`base.njk`, `entry.njk`).
  - `assets/`: Static assets including:
    - `css/styles.css`: Custom overrides for Pico.css.
    - `js/slider-component.js`: The Web Component logic.
    - `images/`: The source satellite images.
  - `entries/`: Each location is a Markdown file here. Metadata (tags, image paths, labels) is stored in the YAML front matter.
  - `index.njk`: The home page template.
  - `tags.njk`: The template for generating category/group pages.
- `.eleventy.js`: Configuration for building the site, including custom collections and a `relative` path filter to ensure all internal links work regardless of the hosting domain.
- `public/`: The directory where the final static site is generated (ignored by Git).

## 🚀 How It Works

### Adding a New Entry
To add a new comparison, simply create a new Markdown file in `src/entries/` with the following front matter:

```yaml
---
title: "Location Name"
date: 2026-04-14
tags: ["Category", "Region"]
comparisons:
  - before: "/assets/images/past.png"
    after: "/assets/images/present.png"
    beforeLabel: "1999"
    afterLabel: "2025"
    attribution: "Google Earth"
---
Any additional text or description about the location goes here.
```

### GitHub Workflow
The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that triggers on every push to the `main` branch. It:
1. Installs dependencies.
2. Builds the static site using Eleventy.
3. Automatically deploys the contents of the `public/` folder to GitHub Pages.

## 💻 Local Development

To run the site locally for development:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run serve
   ```
   This will start a local server (usually at `http://localhost:8080`) and automatically reload the page when you make changes to the source files.

3. **Build for Production:**
   ```bash
   npm run build
   ```
   This generates the final static files in the `public/` directory.

## 🔗 Links

- **GitHub Repository:** [https://github.com/markbush/Past-and-Present](https://github.com/markbush/Past-and-Present)
- **Live Site:** [https://markbush.github.io/Past-and-Present](https://markbush.github.io/Past-and-Present)
