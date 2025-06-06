# Social Auth App
## Project Overview
This project implements a Node.js-based web application that enables users to log in using their Google or Facebook accounts. It leverages OAuth 2.0 protocol through Passport.js strategies, with user data stored in MongoDB. Sessions are managed with express-session and stored persistently using connect-mongo.

## 🔧 Features

- 🌍 Social Login via:
  -   <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google Logo" width="40" />
  -   <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" width="40" alt="Facebook Icon">

## 🔐 Social Media Authentication Flow Diagrams
![image](https://github.com/user-attachments/assets/af3d65cf-e9db-476b-bc0a-ad2efb8af7dd)
![image](https://github.com/user-attachments/assets/26452ea8-b957-4f75-8e55-26081c2c6bf9)

## 🔐 OAuth Providers

- 🛡️ Secure session management with `express-session` and `connect-mongo`
- 🗄️ User data stored in MongoDB using Mongoose
- 🔐 Environment variables for sensitive data
- 🚪 Logout functionality
- 🔒 Route protection (`/profile` requires authentication)
  
---

## 🛠️ Tech Stack

- **Node.js** + **Express**
- **Passport.js** (Google & Facebook Strategies)
- **MongoDB** + **Mongoose**
- **OAuth 2.0**
- **Session Management**: `express-session`, `connect-mongo`
- **dotenv** for config

---

🔐 OAuth Setup
🔹 Google
Go to Google Cloud Console

Create a project → OAuth consent screen → Add scopes (profile, email)

Create credentials → OAuth Client ID

Add http://localhost:3000/auth/google/callback as the Authorized Redirect URI

🔹 Facebook
Go to Facebook Developers

Create a new app → Facebook Login → Web

Set http://localhost:3000/auth/facebook/callback as the Valid OAuth Redirect URI

---

## Setup Instructions

1. Clone the repo

git clone https://github.com/psu-edu/social-auth-app1.git

cd social-auth-app1

📁 Project Structure

social-auth-app/

├── auth/              # OAuth strategies

│   ├── facebook.js

│   └── google.js

├── models/            # Mongoose User model

│   └── User.js

├── routes/            # Auth & profile routes

│   ├── auth.js

│   └── profile.js

├── .env               # Environment config (excluded from Git)

├── .gitignore         # excluded from Git

├── index.js           # Entry point

├── package.json


2. Set Up Environment Variables

Create a .env file in the root directory:

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

FACEBOOK_APP_ID=your_facebook_app_id

FACEBOOK_APP_SECRET=your_facebook_app_secret

SESSION_SECRET=your_session_secret

MONGO_URI=mongodb://localhost:27017/social_auth
PORT=3000


3. MongoDB Community Server Download
   
## 🗄️ Database
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

https://www.mongodb.com/try/download/community

Start MongoDB locally

4. Install Dependencies

npm init -y

npm install express passport passport-google-oauth20 passport-facebook express-session dotenv mongoose connect-mongo

> Make sure MongoDB is running locally before starting the server.

5. Run the App
   
  node index.js
  
  Visit: http://localhost:3000

## Usage

- Visit `/` to login via Google or Facebook
- Redirects to `/profile` on success

## Troubleshooting
- Ensure that OAuth credentials match callback URLs
- MongoDB must be running
- Error handling and logging mechanisms added
  
✍️ Author

Tahira Malik


📝 License

This project is licensed under the MIT License.
