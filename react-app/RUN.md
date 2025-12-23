# How to Run the App in Git Bash

## Step 1: Navigate to the project directory
```bash
cd react-app
```

## Step 2: Install dependencies (if not already installed)
```bash
npm install
```

## Step 3: Start the development server
```bash
npm run dev
```

## Alternative: One-liner commands

### If you're in the root directory:
```bash
cd react-app && npm install && npm run dev
```

### If dependencies are already installed:
```bash
cd react-app && npm run dev
```

## What happens next?

After running `npm run dev`, you should see output like:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and navigate to `http://localhost:5173/` to see the app!

## Other useful commands

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

### Stop the server:
Press `Ctrl + C` in the Git Bash terminal

## Troubleshooting

If you get an error about missing dependencies:
```bash
npm install
```

If you get port already in use error:
```bash
# Kill the process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Or use a different port
npm run dev -- --port 3000
```

