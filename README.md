# TaskFlow - ToDo App

A modern MERN (MongoDB, Express, React, Node.js) todo application with filtering by status (Ongoing/Completed).

## Features
- ✨ Add, view, and manage tasks
- 🔄 Toggle task status (Ongoing ↔ Completed)
- 🗑️ Delete tasks
- 🎯 Filter tasks by status
- 💾 Persistent storage with MongoDB
- 🎨 Modern glassmorphism UI with animations

## Local Development

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB (local or Atlas connection)

### Setup

1. **Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI
   npm run dev
   ```

2. **Frontend** (new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Deployment (Free Tier)

### 1. MongoDB Atlas (Free)
- Sign up: https://www.mongodb.com/cloud/atlas
- Create a free cluster (512MB storage)
- Get connection string from Connect → Drivers
- Copy format: `mongodb+srv://username:password@cluster.mongodb.net/todoapp`

### 2. Backend (Render.com - Free)
- Sign up: https://render.com
- Create **New Web Service**
- Connect GitHub repo
- Environment: Node
- Build command: `npm install`
- Start command: `npm start`
- Add environment variable:
  - Key: `MONGO_URI`
  - Value: (paste your MongoDB Atlas connection string)
- Deploy

### 3. Frontend (Vercel - Free)
- Sign up: https://vercel.com
- Import GitHub repo
- Framework: Vite
- Environment variable:
  - Key: `VITE_API_URL`
  - Value: (your Render backend URL, e.g., `https://yourapp.onrender.com`)
- Update frontend to use env var in `src/main.jsx`:
  ```javascript
  const API_URL = import.meta.env.VITE_API_URL || '/api/todos';
  ```
- Deploy

## Project Structure

```
to-do app/
├── backend/
│   ├── models/     # MongoDB schemas
│   ├── routes/     # API endpoints
│   ├── server.js   # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
└── .gitignore
```

## API Endpoints

- `GET /api/todos` - Fetch all tasks
- `POST /api/todos` - Create task
- `PUT /api/todos/:id` - Update task status
- `DELETE /api/todos/:id` - Delete task

## Notes

- **Do NOT commit `.env`** to GitHub (use `.env.example` as template)
- In-memory MongoDB is used locally if MONGO_URI is invalid
- For production, always use real MongoDB credentials via hosting platform environment variables
