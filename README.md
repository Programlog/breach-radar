# 🛡️ Breach Radar

A modern, secure web application for monitoring email data breaches. Built with React, Node.js, and the HaveIBeenPwned API to help users stay informed about cybersecurity threats and protect their digital privacy.

## ✨ Features

### 🔍 **Instant Breach Detection**
- Check any email address against millions of compromised accounts
- Real-time breach data from HaveIBeenPwned database
- Detailed breach information with affected data types

### 📊 **Personal Dashboard**
- Comprehensive breach history tracking
- Security statistics and trends
- Real-time breach monitoring for registered users

### 🔐 **Security First**
- Rate limiting and input validation
- No password storage - secure email-based authentication
- Privacy-focused design with minimal data retention


## 🏗️ Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for modern, responsive UI
- **React Router** for navigation
- **React Hook Form** for form handling
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** with Prisma ORM
- **JWT** for authentication
- **Helmet** for security headers
- **Rate limiting** with express-rate-limit
- **Input validation** with express-validator

### External APIs
- **HaveIBeenPwned API** for breach data


## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register with email
- `POST /api/auth/login` - Login with email  
- `GET /api/auth/verify` - Verify JWT token

### Breach Checking
- `POST /api/breaches/check` - Check email for breaches
- `GET /api/breaches/history/:email` - Get breach history
- `GET /api/breaches/all` - Get all known breaches

### Dashboard
- `GET /api/dashboard` - Get user dashboard data
- `GET /api/dashboard/stats` - Get detailed statistics


## 🔒 Security Features

- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Sanitizes all user inputs  
- **CORS Protection**: Configurable origins
- **Helmet**: Security headers
- **JWT Authentication**: Stateless auth tokens
- **Email Validation**: MX record verification
- **No Password Storage**: Email-only authentication

**Note:** The app can work in demo mode without an API key, but with limited functionality.