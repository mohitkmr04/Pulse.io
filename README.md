# 🚀 Pulse.io Video Platform

## 🌐 Live Demo
Frontend: https://pulse-io-1.onrender.com  
Backend: https://pulse-io.onrender.com/api  

---

# 📦 Installation and Setup Guide

## 🔧 Prerequisites
- Node.js (v18+)
- MongoDB Atlas
- npm

---

## 📁 Project Structure

### Backend

backend/
├── src/
│ ├── config/ # DB + Cloudinary config
│ ├── controllers/ # Business logic (auth, video)
│ ├── middlewares/ # Auth + upload middleware
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── sockets/ # Socket.IO logic
│ ├── services/ # Processing logic
│ ├── utils/ # Helper functions
│ └── app.js # Express app
├── temp/ # Temporary video storage
├── .env


---

### Frontend

frontend/
├── src/
│ ├── api/ # Axios config
│ ├── app/ # Redux store
│ ├── components/ # UI components
│ ├── features/ # Redux slices
│ ├── pages/ # Pages (Login, Dashboard, Admin)
│ ├── sockets/ # Socket connection
│ ├── App.jsx
│ └── main.jsx
├── public/


---

## ⚙️ Backend Setup

```bash
cd backend
npm install
Create .env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
CLIENT_URL_1=http://localhost:5173
CLIENT_URL_2=https://pulse-io-1.onrender.com
Run Backend
npm run dev
🎨 Frontend Setup
cd frontend
npm install
Create .env
VITE_API_BASE_URL=http://localhost:5000/api
Run Frontend
npm run dev
🚀 Deployment (Render)
Frontend
Root: frontend
Build:
npm install && npm run build
Publish: dist

📡 API Documentation
🔐 Authentication APIs
📝 Register User
POST /api/auth/register
🔹 Request Body (User Input)
{
  "name": "Mohit Kumar",
  "email": "mohit@example.com",
  "password": "123456"
}
🔹 Success Response
{
  "token": "JWT_TOKEN",
  "user": {
    "_id": "user_id",
    "name": "Mohit Kumar",
    "email": "mohit@example.com",
    "role": "user"
  }
}
🔹 Error Response
{
  "msg": "User already exists"
}
🔑 Login User
POST /api/auth/login
🔹 Request Body (User Input)
{
  "email": "mohit@example.com",
  "password": "123456"
}
🔹 Success Response
{
  "token": "JWT_TOKEN",
  "role": "user"
}
🔹 Error Response
{
  "msg": "Invalid credentials"
}
🎥 Video APIs
📤 Upload Video
POST /api/videos/upload
🔹 Headers
Authorization: Bearer JWT_TOKEN
Content-Type: multipart/form-data
🔹 Request Body (User Input)
Field Name: video
Type: File (MP4 / MKV / WEBM / AVI)
🔹 Success Response
{
  "message": "Upload successful"
}
🔹 Error Responses
{
  "msg": "Only valid video files are allowed"
}
{
  "msg": "File too large"
}
{
  "msg": "Unauthorized"
}
📥 Get All Videos
GET /api/videos
🔹 Headers
Authorization: Bearer JWT_TOKEN
🔹 Success Response
{
  "success": true,
  "data": [
    {
      "_id": "video_id",
      "title": "sample.mp4",
      "status": "safe",
      "createdAt": "2026-04-02T10:00:00.000Z"
    }
  ]
}
🔹 Error Response
{
  "msg": "Unauthorized"
}
⚠️ Validation Rules
Allowed formats: .mp4, .mkv, .webm, .avi
Max file size: 100MB
JWT token required for protected routes
📡 Real-Time Events (Socket)

After upload:

🔄 Progress Update
{
  "progress": 45,
  "videoId": "video_id"
}
✅ Completion Event
{
  "message": "Processing completed",
  "videoId": "video_id"
}
