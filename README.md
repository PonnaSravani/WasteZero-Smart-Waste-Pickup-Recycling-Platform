<<<<<<< HEAD
# WasteZero - React Application

=======
# WasteZero-Smart-Waste-Pickup-Recycling-Platform
>>>>>>> 878db9ec9c84326a6d4931a8b97a7249cfd74e91
A comprehensive React application with authentication, dashboard functionality, and backend integration.

## Features

### ✅ Authentication System
- **User Registration** with email OTP verification
- **Secure Login** with password hashing
- **Forgot Password** functionality with email OTP
- **JWT Token** based authentication
- **Protected Routes** for authenticated users

### ✅ Dashboard
- **Comprehensive Dashboard** with statistics and metrics
- **User Activity Tracking** with real-time updates
- **Responsive Design** using Material-UI
- **Quick Actions** panel for common tasks

### ✅ Security Features
- **Password Hashing** using bcryptjs
- **JWT Token** authentication
- **Rate Limiting** to prevent abuse
- **CORS** enabled for cross-origin requests
- **Input Validation** and sanitization

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Axios** for HTTP requests
- **Context API** for state management

### Backend
- **Node.js** with Express
- **bcryptjs** for password hashing
- **jsonwebtoken** for JWT authentication
- **Nodemailer** for email functionality
- **Express Rate Limit** for security

## Project Structure

```
wastezero/
├── src/
│   ├── components/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Dashboard.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── services/
│   │   └── api.ts
│   └── App.tsx
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Frontend Setup

1. **Navigate to the project directory:**
   ```bash
<<<<<<< HEAD
   cd wastezero
=======
   cd WasteZero
   cd WastezeroMainFolder
>>>>>>> 878db9ec9c84326a6d4931a8b97a7249cfd74e91
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
<<<<<<< HEAD
   npm start
=======
   npm run dev
>>>>>>> 878db9ec9c84326a6d4931a8b97a7249cfd74e91
   ```

   The React app will open at `http://localhost:3000`

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
<<<<<<< HEAD
   npm start
=======
   npm run dev
>>>>>>> 878db9ec9c84326a6d4931a8b97a7249cfd74e91
   ```

   The backend API will run at `http://localhost:3001`

## Usage

### 1. User Registration
- Navigate to `/register`
- Fill in your details (name, email, password)
- Verify your email with the OTP sent to your email
- Account is created and you're redirected to dashboard

### 2. User Login
- Navigate to `/login`
- Enter your email and password
- Upon successful authentication, you're redirected to dashboard

### 3. Forgot Password
- Navigate to `/forgot-password`
- Enter your email address
- Verify the OTP sent to your email
- Set a new password

### 4. Dashboard
- View comprehensive statistics and metrics
- Monitor user activity and system status
- Access quick actions for common tasks
- Navigate through the application using the top navigation bar

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/send-otp` - Send OTP for verification
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Send password reset OTP
- `POST /api/auth/reset-password` - Reset password with OTP
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - User logout

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/activity` - Get user activity data

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3001
JWT_SECRET=your-super-secret-jwt-key
```

## Security Features

### Password Security
- Passwords are hashed using bcryptjs with 12 salt rounds
- Minimum password length requirement (6 characters)
- Secure password comparison using bcrypt.compare()

### Authentication Security
- JWT tokens with 24-hour expiration
- Rate limiting (100 requests per 15 minutes per IP)
- CORS enabled for secure cross-origin requests
- Protected routes requiring valid JWT tokens

### OTP Security
- 6-digit numeric OTPs
- 10-minute expiration time
- One-time use (deleted after verification)
- Rate limiting on OTP generation

## Development

### Running in Development Mode
```bash
# Frontend (Terminal 1)
<<<<<<< HEAD
cd wastezero
=======
cd WasteZero
>>>>>>> 878db9ec9c84326a6d4931a8b97a7249cfd74e91
npm start

# Backend (Terminal 2)
cd backend
npm run dev
```

### Building for Production
```bash
# Frontend
npm run build

# Backend
npm start
```

## Testing

The application includes comprehensive error handling and validation:

- Form validation on both frontend and backend
- Error messages for failed operations
- Loading states for better user experience
- Responsive design for mobile and desktop

## Production Considerations

### Frontend
- Build optimization with `npm run build`
- Environment-specific configuration
- Error boundary implementation
- Performance monitoring

### Backend
- Database integration (replace in-memory storage)
- Email service integration (replace mock email)
- Environment variable management
- Logging and monitoring
- SSL/TLS configuration
- Load balancing

## Troubleshooting

### Common Issues

1. **Backend not starting:**
   - Check if port 3001 is available
   - Verify all dependencies are installed
   - Check console for error messages

2. **Frontend not connecting to backend:**
   - Ensure backend is running on port 3001
   - Check CORS configuration
   - Verify API endpoint URLs

3. **Authentication issues:**
   - Clear browser localStorage
   - Check JWT token expiration
   - Verify backend JWT_SECRET

### Debug Mode
- Frontend: Check browser console for errors
- Backend: Check terminal output for server logs
- Network: Use browser DevTools to monitor API calls

<<<<<<< HEAD
## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
=======
>>>>>>> 878db9ec9c84326a6d4931a8b97a7249cfd74e91

## License

This project is licensed under the MIT License.

<<<<<<< HEAD
## Support

For support and questions, please contact the development team or create an issue in the repository.

---

=======
>>>>>>> 878db9ec9c84326a6d4931a8b97a7249cfd74e91
**Note:** This is a development version. For production use, implement proper database storage, email services, and additional security measures.
