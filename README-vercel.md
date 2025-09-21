# Deploying MERN Project to Vercel

## 1. Prepare MongoDB Atlas
- Go to https://www.mongodb.com/cloud/atlas and create a free cluster.
- Create a database user and get your connection string (e.g., `MONGODB_URI`).

## 2. Deploy Frontend (React)
1. Go to https://vercel.com and sign in.
2. Click **New Project** and import your frontend folder (or connect your GitHub repo).
3. Set the **Framework Preset** to React.
4. Vercel will auto-detect the build command (`npm run build`) and output directory (`build`).
5. Deploy!

## 3. Deploy Backend (Express API)
1. Create a new Vercel project for the `backend` folder.
2. Vercel will detect the `vercel.json` and use `@vercel/node` to deploy your API as serverless functions.
3. In the Vercel dashboard, go to **Settings > Environment Variables** and add:
   - `MONGODB_URI` (your MongoDB Atlas connection string)
4. Deploy!

## 4. Update Frontend API URLs
- In production, update your React app to use the deployed backend URL (not `localhost`).
- You can use environment variables in React (`REACT_APP_API_URL`).

## 5. Example: Using Environment Variables in React
In `frontend/src/App.js`:
```js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
fetch(`${API_URL}/api/items`)
```

In Vercel dashboard, set `REACT_APP_API_URL` to your backend deployment URL.

---

**Note:**
- Vercel is best for static frontends and serverless APIs. For long-running connections or WebSockets, consider other platforms.
- For a monorepo, you can deploy both frontend and backend as separate projects in Vercel.

For more, see: https://vercel.com/docs
