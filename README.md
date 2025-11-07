# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Heroku Deployment (Nginx Static Buildpack)

To deploy this Vite React app to Heroku using the Nginx buildpack to serve the compiled static files:

1. Ensure the app builds a `dist/` folder: `npm run build`.
2. Use a buildpack chain so Node installs dependencies & runs the build, then Nginx serves the output:

	```bash
	heroku buildpacks:clear
	heroku buildpacks:add --index 1 heroku/nodejs
	heroku buildpacks:add --index 2 https://github.com/heroku/heroku-buildpack-nginx.git
	```

3. Add a `Procfile` with: `web: bin/start-nginx` (already present).
4. Provide an Nginx template at `config/nginx.conf.erb` (already present) pointing `root /app/dist;`.
5. Deploy:

	```bash
	git push heroku main
	```

The Node buildpack runs `npm install` and `npm run build` (Heroku automatically triggers the build when a `build` script exists). Nginx then serves the static files from `dist` with SPA routing & asset caching.

### SPA Routing
The Nginx config uses `try_files $uri $uri/ /index.html;` so unknown paths fall back to `index.html` for client-side routing.

### Asset Caching
Fingerprinted JS/CSS/image/font assets are cached for 30 days and marked immutable.

