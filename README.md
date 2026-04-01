# Buyer Portal Take-Home Assignment

## Project Overview

This is a simple Buyer Portal application for a real-estate broker.  
It allows users to register, login, and manage their favourite properties.

**Features:**

- User registration and login with email + password
- JWT authentication for secure sessions
- Dashboard showing user's name and role
- Add / remove properties from favourites
- Each user sees only their own favourites
- Clean and responsive UI


## Folder Structure

project/
│
├── backend/
│ ├── server.js
│ ├── db.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── favourites.js
│ └── middleware/
│ └── authMiddleware.js
│
├── frontend/
│ ├── register.html
│ ├── login.html
│ ├── dashboard.html
│ ├── style.css
│ └── script.js
│
└── README.md

## Requirements

- Node.js installed (v14+ recommended)
- npm (Node package manager)
- Modern browser (Chrome/Edge/Firefox)

## How to Run the App

### 1. Backend

```bash
cd backend
npm install
node server.js

Backend will run on http://localhost:3000

Frontend
Open the files in frontend/ folder in your browser:
register.html → To create a new user
login.html → To login
dashboard.html → Main dashboard

Register via API

If you prefer using the API instead of the register page:

fetch("http://localhost:3000/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    password: "123456"
  })
}).then(res => res.json()).then(console.log);

Notes
Only logged-in users can access their dashboard and favourites
Each user sees only their own favourites
Passwords are securely stored using hashing on the backend
JWT token is used for authentication and stored in localStorage
Server-side validation and error handling included