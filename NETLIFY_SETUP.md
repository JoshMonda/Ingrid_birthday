# Netlify Build Settings Configuration

## Step-by-Step Instructions:

1. **In your Netlify Dashboard**, go to the **Build & deploy settings** section (you're already there!)

2. **Click the "Configure" button** under "Build settings"

3. **Enter these exact values:**

   - **Base directory:** `react-app`
   - **Build command:** `npm run build`
   - **Publish directory:** `react-app/dist`
   - **Package directory:** Leave as "Not set"

4. **Click "Save"**

5. **Trigger a new deployment:**
   - Go to the "Deploys" tab in the left sidebar
   - Click "Trigger deploy" → "Deploy site"

## Alternative: Using netlify.toml (Automatic)

The `netlify.toml` file I created should configure this automatically. If you've already committed and pushed it to your repository, Netlify should detect it and use these settings automatically.

However, if you want to set it manually in the dashboard (which is what you're looking at now), follow the steps above.

