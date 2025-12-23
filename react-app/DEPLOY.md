# Deploying to Netlify

## Option 1: Deploy via Netlify Dashboard

1. **Build the app locally first** (optional, but recommended):
   ```bash
   cd react-app
   npm install
   npm run build
   ```

2. **Connect your repository to Netlify:**
   - Go to Netlify Dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. **Configure Build Settings:**
   - **Base directory:** `react-app`
   - **Build command:** `npm run build`
   - **Publish directory:** `react-app/dist`

4. **Deploy!**

## Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# Navigate to react-app directory
cd react-app

# Build the app
npm install
npm run build

# Deploy
netlify deploy --prod
```

## Option 3: Drag & Drop (Quick Deploy)

1. Build the app:
   ```bash
   cd react-app
   npm install
   npm run build
   ```

2. Go to Netlify Dashboard → Sites → Add new site → Deploy manually

3. Drag and drop the `react-app/dist` folder

## Important Notes

- The `netlify.toml` file in the root directory should handle the configuration automatically
- The redirect rule ensures React Router (if used) works correctly with direct URLs
- Make sure Node.js version is set to 18+ in Netlify settings if needed

