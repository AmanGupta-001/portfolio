# Aman Gupta — Portfolio Website

A modern full-stack portfolio built with **React.js** (frontend) and **Node.js/Express** (backend).

## 🗂 Project Structure

```
portfolio/
├── frontend/        ← React app
│   ├── public/
│   └── src/
│       ├── App.js   ← All components
│       └── App.css  ← All styles
└── backend/
    ├── server.js    ← Express API
    └── package.json
```

## 🚀 Quick Start

### 1. Start the Backend

```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### 2. Start the Frontend (new terminal)

```bash
cd frontend
npm install
npm start
# App opens on http://localhost:3000
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Returns all portfolio data (projects, skills, education, etc.) |
| POST | `/api/contact` | Handles contact form submissions |

### Contact API body:
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

## ✉️ Email Setup (Optional)

To enable real email delivery from the contact form, create a `.env` file in `/backend/`:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
```

Then update the nodemailer config in `server.js`.

## 🛠 Tech Stack

**Frontend**
- React 18 with hooks
- Google Fonts (Syne + DM Sans)
- IntersectionObserver for scroll animations
- CSS custom properties for theming
- Responsive for all screen sizes

**Backend**
- Node.js + Express
- CORS enabled
- Nodemailer for email
- dotenv for environment config

## 🎨 Design

- Dark theme with teal accent (#00d4aa)
- Syne display font + DM Sans body
- Animated hero with floating particles
- Scroll-triggered section animations
- Interactive project cards with expand/collapse
- Mobile-first responsive layout

## 📦 Production Build

```bash
# Build frontend for production
cd frontend
npm run build

# Serve the build from backend (add this to server.js):
# app.use(express.static(path.join(__dirname, '../frontend/build')));
```
