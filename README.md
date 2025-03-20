# Agent Management


## Features
- User authentication (Signup/Login)
- User can create agent 
- File uploads ( for tasks )
- tasks are assigned to different agents
- Secure API with JWT authentication
- Uses MongoDB for data storage

## Tech Stack
### Frontend:
- React.js
- Axios (for API requests)
- Material Ui ( for better styling )

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

---
## clone the Project 
```sh
git clone https://github.com/Rashid-123/Agent_assignment.git
cd Agent_assignment
```
## Frontend Setup

### Prerequisites
- Node.js installed

### Installation
```sh
cd frontend  # Navigate to frontend folder
npm install  
```

### Running the Frontend
```sh
npm run dev
```

### Frontend `.env` Configuration
Create a `.env` file inside the `frontend` folder and add:
```
VITE_BACKEND_URL = http://localhost:5000
```

---

## Backend Setup

### Prerequisites
- Node.js installed
- 
### Installation
```sh
cd backend  # Navigate to backend folder
npm install
```

### Running the Backend
```sh
npm run dev
```

### Backend `.env` Configuration
Create a `.env` file inside the `backend` folder and add:
```
PORT=5000
MONGO_URI= (you mongodb url )
JWT_SECRET=your_jwt_secret
FRONTEND_URL= http://localhost:5173 ( Change if it is different )
JWT_SECRET = ( your jwt secret )
JWT_EXPIRE = 7d ( you can change the day )
```
---
## License
This project is licensed under the MIT License.

