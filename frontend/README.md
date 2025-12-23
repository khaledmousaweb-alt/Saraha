# Saraha App - Anonymous Messaging Platform

A modern, full-stack anonymous messaging application built with Node.js, Express, MongoDB, and vanilla JavaScript.

## 🌟 Features

- **Anonymous Messaging**: Send and receive completely anonymous messages
- **User Authentication**: Secure registration and login with JWT tokens
- **Email Verification**: Email activation for new accounts
- **Modern UI**: Beautiful, responsive design with glassmorphism effects
- **Real-time Updates**: Dynamic message loading and display
- **Share Links**: Unique shareable links for receiving messages
- **Message Management**: View inbox, sent messages, and delete messages

## 🚀 Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Crypto-JS** - Phone number encryption
- **Nodemailer** - Email sending

### Frontend
- **HTML5** - Structure
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No frameworks, pure JS
- **Google Fonts** - Inter & Poppins typography

## 📁 Project Structure

```
Saraha_App/
├── frontend/                 # Frontend application
│   ├── css/
│   │   ├── main.css         # Design system & global styles
│   │   ├── auth.css         # Authentication pages styles
│   │   └── dashboard.css    # Dashboard & messaging styles
│   ├── js/
│   │   ├── api.js           # API service module
│   │   ├── utils.js         # Utility functions
│   │   └── dashboard.js     # Dashboard functionality
│   ├── index.html           # Landing page
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── dashboard.html       # Main dashboard
│   └── profile.html         # User profile page
├── src/                      # Backend source
│   ├── DB/                  # Database models & connection
│   ├── Modules/             # Feature modules
│   │   ├── Auth/           # Authentication
│   │   ├── user/           # User management
│   │   └── Message/        # Messaging
│   ├── middleWares/        # Express middlewares
│   └── utils/              # Utility functions
├── index.js                 # Server entry point
├── package.json            # Dependencies
└── .env                    # Environment variables
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository
```bash
cd Saraha_App
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:

```env
PORT=2000
DB_CONNECTION=mongodb://localhost:27017/saraha
TOKEN_KEY_USER=your_user_token_secret
TOKEN_KEY_ADMIN=your_admin_token_secret
EMAIL_KEY=your_email_token_secret
ENCTYPT_KEY=your_encryption_key
```

### 4. Start the server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### 5. Access the application
Open your browser and navigate to:
```
http://localhost:2000
```

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/activate_email/:token` - Activate email

### User
- `GET /user/` - Get user profile (requires auth)

### Messages
- `POST /message/sendMessage` - Send anonymous message
- `GET /message/getAllMessages` - Get all messages (inbox/sent)
- `GET /message/:_id` - Get single message
- `DELETE /message/deletMessage` - Delete message

## 🎨 Design Features

### Visual Design
- **Gradient Backgrounds**: Vibrant, modern color schemes
- **Glassmorphism**: Frosted glass effects on cards
- **Smooth Animations**: Micro-interactions and transitions
- **Responsive Layout**: Mobile-first design
- **Custom Typography**: Google Fonts integration

### User Experience
- **Form Validation**: Real-time input validation
- **Loading States**: Visual feedback during operations
- **Toast Notifications**: Non-intrusive user feedback
- **Error Handling**: Graceful error messages
- **Intuitive Navigation**: Clear visual hierarchy

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Phone Encryption**: AES encryption for phone numbers
- **Email Verification**: Account activation via email
- **Input Sanitization**: XSS prevention
- **CORS Configuration**: Controlled cross-origin requests

## 📱 Usage

### For Users Receiving Messages

1. **Register**: Create an account with email and password
2. **Verify Email**: Click the activation link sent to your email
3. **Login**: Access your dashboard
4. **Share Link**: Copy your unique link from the dashboard
5. **Receive Messages**: Share your link on social media
6. **View Messages**: Check your inbox for anonymous messages

### For Users Sending Messages

1. **Get Link**: Obtain a Saraha user's share link
2. **Send Message**: Write and send your anonymous message
3. **Stay Anonymous**: Your identity remains completely hidden

## 🚧 Future Enhancements

- [ ] Real-time notifications
- [ ] Message reactions
- [ ] User blocking
- [ ] Message filtering
- [ ] Dark mode toggle
- [ ] Social media integration
- [ ] Message analytics
- [ ] Export messages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

Built with ❤️ for anonymous communication

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Note**: This is a full-stack application. Make sure both the backend server and frontend are properly configured before use.
