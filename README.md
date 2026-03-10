# Blush & Bloom — Cute Stationery Shop

A static stationery storefront built with **Gatsby** and **Decap CMS**, deployed on **GitHub Pages**.

## Quick Start

```bash
npm install
npm run develop
```

Visit `http://localhost:8000` for the site and `http://localhost:8000/admin/` for the CMS.

## Deploying to GitHub Pages

Deployment is automated via GitHub Actions. Every push to `main` triggers a build and deploy.

### Enable GitHub Pages

1. Go to **Settings → Pages** in this repository.
2. Under **Source**, select **GitHub Actions**.

### Set Up Decap CMS Authentication (GitHub OAuth)

Decap CMS uses GitHub as its authentication backend. To enable login:

1. Go to [GitHub Developer Settings → OAuth Apps](https://github.com/settings/developers).
2. Click **New OAuth App**.
3. Fill in:
   - **Application name**: `Blush & Bloom CMS` (or any name)
   - **Homepage URL**: `https://maitri.me/luna_stationery_gy/`
   - **Authorization callback URL**: `https://maitri.me/luna_stationery_gy/admin/`
4. Click **Register application** and copy the **Client ID**.
5. Open `static/admin/config.yml` and add your Client ID:

```yaml
backend:
  name: github
  repo: plantainchip/luna_stationery_gy
  branch: main
  auth_type: pkce
  app_id: YOUR_CLIENT_ID_HERE
```

6. Commit and push. The CMS will now authenticate via GitHub.

### Set Up Order Submissions (Formspree)

The shopping cart submits orders to [Formspree](https://formspree.io), a free write-only form API. Submissions are only visible in your Formspree dashboard and via email — no public read access.

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form and copy the **Form ID** (the part after `/f/` in the endpoint URL).
3. Either:
   - Edit `content/settings/general.md` and set `formspree_id: "your_form_id"`, **or**
   - Enter it via the CMS at `/admin/` under **Site Settings → Formspree Form ID**.
4. Rebuild and deploy. Orders will now be submitted to your Formspree inbox.

## CMS Content Structure

Access the CMS at `/admin/` after deployment.

| Collection | What You Can Edit |
|---|---|
| **Site Settings** | Brand name, Formspree form ID, announcement messages, nav links, footer links, categories, colors |
| **Hero Section** | Badge text, heading, description, CTA buttons |
| **Promo Banner** | Sale heading, subtext, coupon code, background gradient colors |
| **Newsletter** | Heading, description, button text |
| **Products** | Title, category, price, emoji, image, card color, new/featured flags |

### Style Fields (CMS-controlled)

These colors can be changed from the CMS without touching code:

- Primary / Secondary / Accent colors
- Announcement bar background color
- Footer background color
- Promo banner gradient colors
- Individual product card background colors

## Project Structure

```
content/           Markdown content managed by Decap CMS
  home/            Hero, promo banner, newsletter content
  products/        Product entries
  settings/        Site-wide settings and style config
src/
  components/      React components (includes CartDrawer)
  context/         React Context (CartContext for shopping cart state)
  pages/           Gatsby pages
  styles/          Global CSS
static/
  admin/           Decap CMS entry point and config
  img/             Uploaded media
.github/
  workflows/       GitHub Actions deploy workflow
```

## Scripts

| Command | Description |
|---|---|
| `npm run develop` | Start dev server at localhost:8000 |
| `npm run build` | Production build with path prefix |
| `npm run serve` | Serve production build locally |
| `npm run clean` | Clear Gatsby cache |
