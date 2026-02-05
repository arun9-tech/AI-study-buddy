<div align="center">
</div>

# AI Study Buddy 📚

An intelligent study companion application that leverages Google's Gemini AI to enhance your learning experience. Features personalized study sessions, progress tracking, and AI-powered insights.

## 🌟 Features

- **Personalized Study Sessions**: AI-generated study content tailored to your needs
- **User Authentication**: Secure login and registration system
- **Progress Tracking**: Monitor your study history and performance
- **Interactive Dashboard**: Clean, modern interface for managing your studies
- **AI-Powered Insights**: Get intelligent feedback and recommendations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

This application consists of:

- **Frontend**: React + TypeScript with Vite
- **Backend**: Node.js + Express
- **Database**: MySQL
- **AI Integration**: Google Gemini API
- **Styling**: Tailwind CSS with Framer Motion animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL database
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-studybuddy
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

### Configuration

1. **Frontend Environment Variables**
   Create a `.env.local` file in the `frontend` directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_API_URL=http://localhost:5000
   ```

2. **Backend Environment Variables**
   Create a `.env` file in the `backend` directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=studybuddy
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```

3. **Database Setup**
   ```sql
   CREATE DATABASE studybuddy;
   USE studybuddy;
   
   -- Users table
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(50) UNIQUE NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   -- Study sessions table
   CREATE TABLE study_sessions (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT,
     topic VARCHAR(255) NOT NULL,
     content TEXT,
     ai_feedback TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id)
   );
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
ai-studybuddy/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── types.ts       # TypeScript type definitions
│   │   └── App.tsx        # Main application component
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── docs/             # API documentation
│   ├── server.js         # Express server setup
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Study Sessions
- `POST /api/sessions` - Create new study session
- `GET /api/sessions/:userId` - Get user's study sessions
- `GET /api/sessions/detail/:sessionId` - Get session details

## 🤖 AI Integration

The application uses Google's Gemini API for:
- Generating personalized study content
- Providing intelligent feedback
- Creating adaptive learning recommendations

To get a Gemini API key:
1. Visit [Google AI Studio](https://ai.studio/)
2. Create a new API key
3. Add it to your environment variables

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📱 Usage

1. **Register** for a new account or **login** if you already have one
2. **Create study sessions** by selecting topics or subjects
3. **Interact with AI** to get personalized study content
4. **Track your progress** through the dashboard
5. **View your history** to review past study sessions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
- Check the [Issues](../../issues) page
- Create a new issue with detailed information
- Review the documentation in the `backend/docs` folder

## 🔗 Links

- **AI Studio App**: https://ai.studio/apps/drive/1ecZfuPlHdlAS-96dMCghHzZpsZsXm5kX
- **Google Gemini API**: https://ai.google.dev/
- **React Documentation**: https://react.dev/
- **Express Documentation**: https://expressjs.com/
