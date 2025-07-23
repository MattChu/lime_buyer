# <img src="./assets/lime-logo.png" alt="Lime Logo" width="50" /> LimeBuyer - Frontend

A responsive React frontend for LimeBuyer, an interactive app for locating and reviewing fruit shops. Users can:

- 🗺️ View nearby stores using a Leaflet map powered by Overpass API
- 📍 Filter stores by distance and location
- 📝 View and add reviews for each store
- 🔐 Sign up and log in with Firebase OAuth
- 🧹 Post and delete your own reviews from the dashboard
- ✏️ Update username and avatar directly from edit profile in dashboard

🔵 Live site - https://lime-buyer.vercel.app/mapview

# Tech Stack

- React
- React Router Dom
- Material UI
- Firebase (OAuth + Auth state)
- Leaflet (Map display)
- Overpass API (real-time shop data)
- Fetch API
- Vite (for bundling and dev server)
- Deployed with Vercel

# Setup

1. Clone repository:

```bash
git clone https://github.com/MattChu/lime_buyer.git
```

2. Install dependencies:

```bash
npm install
```

# Firebase Auth Setup

This project uses Firebase Authentication for OAuth.

1. Create a firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable the following:

- Email/Password Auth
- Google OAuth

3. Create a .env file in the root directory with the following:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

✅ Important: **Do not commit your .env file.** It should be included in your .gitignore already.

Your Firebase setup is handled in 📁 /firebase/firebase.config.js.

3. Start development server:

```bash
npm run dev
```

4. Open in browser: App will be running at http://localhost:5173
