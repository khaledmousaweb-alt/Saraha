# Saraha App - Angular Frontend

A modern, premium Angular frontend for the Saraha anonymous messaging application. Built with Angular 17+ using standalone components, featuring a beautiful glassmorphism UI design with smooth animations.

## 🚀 Features

### Authentication
- **User Registration** - Create new account with email verification
- **User Login** - Secure JWT-based authentication
- **Protected Routes** - Auth guards for secure pages
- **Auto Logout** - Token expiration handling

### Dashboard
- **Inbox Tab** - View all received anonymous messages
- **Sent Tab** - View all sent messages
- **Send Message Tab** - Send anonymous messages to other users
- **Share Link Tab** - Get your unique user ID to share with others

### Profile
- **User Information** - View your profile details
- **User ID Display** - Copy your ID to clipboard
- **Logout** - Secure session termination

### UI/UX
- **Modern Design** - Premium glassmorphism effects
- **Responsive** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Polished transitions and effects
- **Toast Notifications** - Real-time feedback for user actions
- **Loading States** - Visual feedback during API calls

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

## 🛠️ Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend-angular
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   
   Update the API URL in `src/environments/environment.ts` if needed:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:2000'
   };
   ```

## 🏃 Running the Application

### Development Server

Start the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any source files.

### Production Build

Build the application for production:
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
frontend-angular/
├── src/
│   ├── app/
│   │   ├── core/                    # Core functionality
│   │   │   ├── guards/              # Route guards
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/        # HTTP interceptors
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── models/              # TypeScript interfaces
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── message.model.ts
│   │   │   │   └── api-response.model.ts
│   │   │   └── services/            # Business logic services
│   │   │       ├── auth.service.ts
│   │   │       ├── user.service.ts
│   │   │       ├── message.service.ts
│   │   │       └── toast.service.ts
│   │   ├── features/                # Feature modules
│   │   │   ├── auth/                # Authentication
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── dashboard/           # Main dashboard
│   │   │   │   ├── inbox/
│   │   │   │   ├── sent/
│   │   │   │   ├── send-message/
│   │   │   │   └── share-link/
│   │   │   └── profile/             # User profile
│   │   ├── shared/                  # Shared components
│   │   │   └── components/
│   │   │       ├── navbar/
│   │   │       ├── message-card/
│   │   │       └── toast/
│   │   ├── app.routes.ts            # Routing configuration
│   │   ├── app.config.ts            # App configuration
│   │   └── app.ts                   # Root component
│   ├── environments/                # Environment configs
│   │   ├── environment.ts
│   │   └── environment.development.ts
│   └── styles.css                   # Global styles
```

## 🔑 Key Technologies

- **Angular 17+** - Latest Angular framework with standalone components
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **Angular Router** - Client-side routing with lazy loading
- **HttpClient** - HTTP communication with backend
- **JWT Decode** - JWT token parsing
- **CSS3** - Modern styling with animations

## 🎨 Design System

### Color Palette
- **Primary Gradient**: `#667eea` → `#764ba2`
- **Success**: `#48bb78` → `#38a169`
- **Error**: `#f56565` → `#e53e3e`
- **Background**: Gradient overlays with glassmorphism

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Components
- **Glassmorphism Cards** - Semi-transparent with backdrop blur
- **Smooth Animations** - Slide-in, fade-in effects
- **Responsive Grid** - Auto-fill grid layouts
- **Custom Scrollbar** - Styled scrollbars matching theme

## 🔐 Authentication Flow

1. **Register**: User creates account → Email sent for activation
2. **Login**: User enters credentials → JWT token received and stored
3. **Auto-Auth**: HTTP interceptor adds token to all requests
4. **Protected Routes**: Auth guard checks token validity
5. **Token Expiration**: Auto-logout on 401 responses

## 📡 API Integration

### Base URL
```typescript
http://localhost:2000
```

### Endpoints Used

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

#### User
- `GET /user/` - Get current user profile (requires auth)

#### Messages
- `POST /message/sendMessage` - Send message
- `GET /message/getAllMessages` - Get messages (inbox/sent)
- `DELETE /message/deletMessage` - Delete message

## 🧪 Testing

### Manual Testing Checklist

1. **Registration**
   - [ ] Fill registration form with valid data
   - [ ] Verify email validation
   - [ ] Check password matching
   - [ ] Confirm success message

2. **Login**
   - [ ] Enter valid credentials
   - [ ] Verify redirect to dashboard
   - [ ] Check token storage in localStorage

3. **Dashboard**
   - [ ] View inbox messages
   - [ ] View sent messages
   - [ ] Send new message
   - [ ] Delete message
   - [ ] Copy user ID from share tab

4. **Profile**
   - [ ] View user information
   - [ ] Copy user ID
   - [ ] Logout

5. **Responsive Design**
   - [ ] Test on desktop (1920px)
   - [ ] Test on tablet (768px)
   - [ ] Test on mobile (375px)

## 🚨 Troubleshooting

### Build Errors

**Problem**: TypeScript compilation errors
```bash
Solution: Run `npm install` to ensure all dependencies are installed
```

**Problem**: Module not found errors
```bash
Solution: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Runtime Errors

**Problem**: CORS errors when calling API
```bash
Solution: Ensure backend CORS is configured to allow frontend origin
```

**Problem**: 401 Unauthorized errors
```bash
Solution: Check if JWT token is valid and not expired
Clear localStorage and login again
```

**Problem**: Messages not loading
```bash
Solution: Verify user is authenticated and API is running
Check browser console for error details
```

## 📝 Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow Angular style guide
- Use reactive forms for all forms
- Implement proper error handling
- Add loading states for async operations

### Component Structure
- Keep components focused and single-purpose
- Use standalone components
- Implement OnDestroy for cleanup
- Use async pipe for observables in templates

### Service Layer
- Keep business logic in services
- Use dependency injection
- Return observables from HTTP calls
- Handle errors in services

## 🔄 Future Enhancements

- [ ] Real-time message updates with WebSockets
- [ ] Message read/unread status
- [ ] User profile editing
- [ ] Password change functionality
- [ ] Dark/Light theme toggle
- [ ] Message search and filtering
- [ ] Pagination for large message lists
- [ ] Email notifications
- [ ] User blocking feature
- [ ] Message reporting system

## 📄 License

This project is part of the Saraha App ecosystem.

## 👥 Support

For issues or questions, please check the backend documentation or contact the development team.

---

**Built with ❤️ using Angular**
