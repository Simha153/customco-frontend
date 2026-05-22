# Day 1 Setup — Custom.Co Frontend

## Stack
- Vite + React 18
- Tailwind CSS (dark luxury theme)
- React Router v6
- Axios (with JWT interceptor)
- react-hot-toast

## Setup Commands

```bash
# 1. Create project folder (open terminal anywhere)
mkdir customco-frontend
cd customco-frontend

# 2. Copy all files from this zip into the folder

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

App runs at: http://localhost:3000
Backend must be running at: http://localhost:8080

## Files Created Today

| File | Purpose |
|---|---|
| src/main.jsx | React entry point |
| src/App.jsx | Router setup |
| src/index.css | Global Tailwind + custom styles |
| src/services/api.js | All API calls (axios) |
| src/context/AuthContext.jsx | Login state (global) |
| src/components/layout/Navbar.jsx | Top navigation |
| src/components/layout/Footer.jsx | Footer |
| src/components/layout/Layout.jsx | Page wrapper |
| src/components/ui/Spinner.jsx | Loading spinner |
| src/components/ui/ProtectedRoute.jsx | Auth guard |
| src/pages/HomePage.jsx | Landing page |
| src/pages/LoginPage.jsx | Login form |
| src/pages/RegisterPage.jsx | Register form |

## Day 2 Preview
- ProductsPage (listing + pagination)
- ProductDetailPage
- Search + filter components
