# 📘 Full Stack Agent Management System with Next.js (Frontend) & Node.js (Backend)

This project uses **Next.js** for the frontend and **Node.js** with **Express** for the backend. The backend interacts with a MongoDB database, and the frontend communicates with the backend via RESTful APIs.



## 🛠️ Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Rashid-123/Agent_assignment.git
cd Agent_assignment
```

### 2. Backend Setup (Node.js + Express)

```bash
cd server
npm install
```

* Create a `.env` file and add your environment variables:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
```

* Run the backend server:

```bash
npm run dev    # Uses nodemon
```

### 3. Frontend Setup (Next.js)

```bash
cd ../client
npm install
```

* Create a `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

* Run the frontend server:

```bash
npm run dev
```

* Visit `http://localhost:3000`

---

## 🚀 Start Both Servers

**Backend (Port 5000)**

```bash
cd server && npm run dev
```

**Frontend (Port 3000)**

```bash
cd client && npm run dev
```

---

## 🧪 Useful Scripts

### Backend:

* `npm run dev` — start dev server with Nodemon
* `npm start` — start production server

### Frontend:

* `npm run dev` — start development Next.js server
* `npm run build` — build app for production
* `npm start` — start production Next.js server



## Happy Coding
