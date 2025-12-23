# Saraha App - Quick Start Guide

## Server is Running! ✅

Your backend server is currently running on **http://localhost:2000**

## How to Access the Application

1. **Open your browser** and navigate to: `http://localhost:2000`
2. You'll see the landing page with options to **Login** or **Register**

## Quick Test Flow

### 1. Register a New User
- Go to: `http://localhost:2000/register.html`
- Fill in the form and submit
- You'll be redirected to login

### 2. Login
- Go to: `http://localhost:2000/login.html`
- Enter your credentials
- You'll be redirected to the dashboard

### 3. Dashboard Features
- **Inbox Tab**: View received messages
- **Sent Tab**: View sent messages  
- **Send Tab**: Send anonymous messages to other users
- **Share Tab**: Get your unique share link

### 4. Profile
- Click "Profile" in the navigation
- View your account information
- Copy your share link to receive messages

## Important Notes

✅ **All connections are complete:**
- Backend API endpoints are working
- Frontend is connected to backend
- CORS is configured
- User authentication is functional
- Message CRUD operations are implemented

🔑 **User ID System:**
- Share links now use user IDs (not emails)
- User profile is fetched from API after login
- All data is properly synchronized

📝 **API Endpoints:**
- Registration: `POST /auth/register`
- Login: `POST /auth/login`
- Get Profile: `GET /user/`
- Send Message: `POST /message/sendMessage`
- Get Messages: `GET /message/getAllMessages`
- Delete Message: `DELETE /message/deletMessage`

## Testing Checklist

- [ ] Register a new user
- [ ] Login with credentials
- [ ] View dashboard with user profile
- [ ] Send a message to another user
- [ ] View inbox messages
- [ ] Delete a message
- [ ] Check profile page
- [ ] Copy share link
- [ ] Logout

## Troubleshooting

**Can't access the site?**
- Make sure the server is running (check terminal)
- Verify you're using `http://localhost:2000`

**Login not working?**
- Check if you activated your email (check server logs)
- Verify credentials are correct

**Messages not showing?**
- Make sure you're using the correct user ID
- Check browser console for errors

For detailed testing instructions, see [walkthrough.md](file:///home/khaled/.gemini/antigravity/brain/359273a0-572c-4c65-b40b-382860956bdc/walkthrough.md)
