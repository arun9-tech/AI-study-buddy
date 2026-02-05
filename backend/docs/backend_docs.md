
# AI StudyBuddy - Backend Architecture

Since the current deployment is a high-fidelity React SPA, the following structure outlines the requested Node.js/Express/MySQL backend for a production deployment.

## 1. Database Schema (MySQL)

```sql
CREATE DATABASE IF NOT EXISTS studybuddy_db;
USE studybuddy_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Study Sessions Table
CREATE TABLE IF NOT EXISTS study_sessions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  original_text LONGTEXT,
  summary TEXT,
  simple_explanation TEXT,
  questions TEXT,
  speech_score INT,
  speech_feedback TEXT,
  difficulty ENUM('Easy', 'Medium', 'Hard'),
  reading_time VARCHAR(20),
  keywords JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 2. API Routes (Express)

- `POST /api/auth/register`: Hashes password using `bcrypt` and stores user.
- `POST /api/auth/login`: Validates credentials and returns a JWT token.
- `POST /api/ai/process`: 
  - Authenticates via JWT.
  - Receives text or handles multipart file upload (PDF parsing using `pdf-parse`).
  - Calls Gemini API with structured prompts.
  - Saves result to `study_sessions` table.
- `GET /api/history`: Returns all sessions for the logged-in user.
- `POST /api/ai/speech`: Generates and returns audio bytes from Gemini TTS model.

## 3. Implementation Details

For this hackathon demo, we utilized:
- **LocalStorage**: To persist user profiles and study history.
- **Client-Side Gemini SDK**: To provide immediate AI results without backend latency.
- **Framer Motion**: For the futuristic anti-gravity UX.
