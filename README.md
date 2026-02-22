# Project Name (Assignment)

A full-stack application with user authentication and an interactive product analytics dashboard.

## 🚀 Live Demo

- **Frontend Live URL**: [https://assignment-frontend-tau-taupe.vercel.app](https://assignment-frontend-tau-taupe.vercel.app)
- **Backend API URL**: [https://assignment-fymw.onrender.com/api](https://assignment-fymw.onrender.com/api)

---

## 💻 Tech Stack

- **Frontend**: React, TypeScript, Vite, React Router, Recharts, Axios
- **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Authentication**: JWT & Cookies

---

## 📂 Project Structure

This repository contains both the frontend and backend in a monorepo structure:

- `/frontend`: Contains the React application codebase.
- `/backend`: Contains the Node.js/Express API codebase.

---

## 🗄️ Database Access

The interviewer can view the active database directly using this connection string in Postgres tools (like pgAdmin or DBeaver):

```
postgresql://analytics_db_kzjh_user:dYcwcGGlA8bWKzSS2LDTjRbS2pH46gcO@dpg-d6d8n14tgctc73f05dug-a.oregon-postgres.render.com/analytics_db_kzjh?sslmode=require
```

---

## 🛠️ Local Development Setup

### 1. Backend Setup

1. CD into the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` and add your database variables (PostgreSQL URL).
4. Run Prisma migrations (if applicable): `npx prisma migrate dev`
5. Start the backend development server: `npm run dev`

### 2. Frontend Setup

1. CD into the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` and add `VITE_API_URL=http://localhost:5000/api` (or your backend port)
4. Start the frontend development server: `npm run dev`

---

## 🔒 Authentication Flow

The application uses secure, `httpOnly` cookies along with JSON Web Tokens (JWT) to persist authentication state across sessions.
