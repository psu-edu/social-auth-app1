
# Social Auth App

## Setup Instructions
1. Clone the repo

git clone https://github.com/yourusername/social-auth-app.git
cd social-auth-app


2. Create `.env` file with:
   - GOOGLE_CLIENT_ID=
   - GOOGLE_CLIENT_SECRET=
   - FACEBOOK_APP_ID=
   - FACEBOOK_APP_SECRET=
   - SESSION_SECRET=your_session_secret
MONGO_URI=mongodb://localhost:27017/social_auth
PORT=3000

3. MongoDB Community Server Download
https://www.mongodb.com/try/download/community
Start MongoDB locally

4. Run 
npm init -y
npm install express passport passport-google-oauth20 passport-facebook express-session dotenv mongoose connect-mongo

> Make sure MongoDB is running locally before starting the server.

5. Run `node index.js`

## Usage
- Visit `/` to login via Google or Facebook
- Redirects to `/profile` on success

## Troubleshooting
- Ensure your OAuth credentials match callback URLs
- MongoDB must be running
