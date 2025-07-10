# Dragon Dictation Auto-Text Aggregator for Emergency Medicine

## Project Description
A static website to browse, search, and filter common auto-text phrases for emergency medicine, aggregated from JSON files in `resources/wikem/`.

## Deployment (GitHub Pages)

1. **Push your code to GitHub.**
   - Make sure all files (including `index.html`, `style.css`, `script.js`, and the `resources/wikem/` folder) are committed and pushed.

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Click on `Settings` > `Pages` in the sidebar.
   - Under "Source", select the branch you want to deploy (usually `main` or `master`).
   - Set the folder to `/ (root)`.
   - Click `Save`.

3. **Access your site:**
   - After a few minutes, your site will be available at `https://<your-username>.github.io/<your-repo>/`.

**Note:**
- All JSON files in `resources/wikem/` must be present for the app to function.
- No build step is required; all code is static and client-side.