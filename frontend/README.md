# Frontend (Infyron) — Vite + React + Tailwind

Quick start

1. Install dependencies
```bash
cd frontend
npm install
```

2. Run development server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
```

Notes
- The app includes a placeholder logo at `frontend/assets/logo-placeholder.png` — replace with your real logo.
- Contact form POSTs to `http://localhost:5000/contact` by default. Update the endpoint in `src/pages/Home.jsx` if needed.

Images & theme
- The project thumbnails use industry-themed images sourced from Unsplash via query (for example `https://source.unsplash.com/600x360/?manufacturing`) so the visuals relate to each sector rather than showing generic nature photos. The Clients & Partners grid was removed from the default layout.
- To use your own images, copy them into `frontend/public/assets/` and name them:
	- `hero.jpg` (recommended size ~1920x800)
	- `project-erp.jpg`, `project-insurance.jpg`, `project-ecom.jpg` (for project thumbnails)

Copy example (macOS):
```bash
# create public assets folder then copy your hero image there
mkdir -p ~/infyron-project/frontend/public/assets
cp ~/Downloads/hero.jpg ~/infyron-project/frontend/public/assets/hero.jpg
cp ~/Downloads/project-erp.jpg ~/infyron-project/frontend/public/assets/project-erp.jpg
```

How it is used
- The hero/header uses `/assets/hero.jpg` (served from `frontend/public/assets/hero.jpg`). Project thumbnails default to Unsplash query images; to override them with local files, change the image src in `src/pages/Home.jsx` to point to `/assets/project-erp.jpg`, etc., or I can update the code to prefer local files if present.

Color theme
- Tailwind theme includes a `brand` color scale and `accent` colors in `tailwind.config.cjs`. You can change those values to match your brand colors.

