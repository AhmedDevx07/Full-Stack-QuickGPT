<div align="center">

# 💬 QuickGPT — Full-Stack AI Chatbot

### A full-stack MERN AI chatbot powered by Google Gemini, with credit-based payments

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-4CAF50?style=for-the-badge&logo=vercel)](https://full-stack-quickgpt.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/AhmedDevx07/Full-Stack-QuickGPT)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Gemini API](https://img.shields.io/badge/Google%20Gemini-AI%20Engine-8E75B2?style=for-the-badge&logo=google)](https://ai.google.dev/)

</div>

---

## 📌 Overview

**QuickGPT** is a full-stack AI chatbot application built on the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Users can sign up, chat with an AI model (powered by **Google Gemini**, accessed via an OpenAI-compatible interface), save their conversation history to the database, and purchase additional credits through an integrated **online payment gateway**.

This project was built as part of the **Internee.pk Internship Program**, covering authentication, AI integration, database design, payments, and full-stack deployment.

---

## 🚀 Live Demo

🔗 **[https://full-stack-quickgpt.vercel.app/](https://full-stack-quickgpt.vercel.app/)**

---

## ✨ Key Features

### 🔐 Authentication
- Secure **user sign-up & login**
- Session/token-based authentication

### 🤖 AI Chat Engine
- AI-generated text responses powered by **Google Gemini**
- Integrated using an **OpenAI-compatible package**, making the AI layer flexible and swappable
- Real-time, conversational chat interface

### 💾 Chat Persistence
- All conversations are **saved to MongoDB**
- Users can revisit and continue previous chats anytime

### 💳 Credit & Payment System
- **Credit-based usage model** — each AI generation consumes credits
- Integrated **online payment gateway** to purchase additional credits
- Secure transaction handling

### ⚡ Full-Stack Architecture
- **Frontend:** React.js for a responsive, dynamic chat UI
- **Backend:** Node.js + Express.js REST API
- **Database:** MongoDB for users, chats & credit history
- **Deployment:** Fully deployed and live on **Vercel**

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **AI Engine** | Google Gemini API (via OpenAI-compatible SDK) |
| **Authentication** | JWT / Session-based Auth |
| **Payments** | Online Payment Gateway Integration |
| **Deployment** | Vercel |

---

## 🗂️ Project Structure

```
Full-Stack-QuickGPT/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── configs/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   └── public/
├── .gitignore
└── README.md
```

---

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A **Google Gemini API Key** ([Get one here](https://ai.google.dev/))
- Payment gateway credentials (e.g. Stripe/Razorpay/local gateway)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AhmedDevx07/Full-Stack-QuickGPT.git
cd Full-Stack-QuickGPT
```

#### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
PAYMENT_GATEWAY_KEY=your_payment_gateway_key
NODE_ENV=development
```

```bash
npm run dev
```

#### Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔄 How It Works

1. **User signs up / logs in** to the platform
2. **User starts a chat** — message is sent to the backend
3. Backend forwards the prompt to **Google Gemini AI** (via OpenAI-style API call)
4. AI response is generated and **saved to MongoDB**, then returned to the user
5. Each AI generation **deducts credits** from the user's account
6. When credits run low, the **payment gateway** lets users purchase more
7. All chat history remains saved and accessible across sessions

---

## 🎯 Task Requirements Covered

| Requirement | Status |
|---|---|
| MERN stack architecture | ✅ Done |
| User sign-up & login | ✅ Done |
| AI text generation (Gemini via OpenAI package) | ✅ Done |
| Save chats in MongoDB | ✅ Done |
| Online payment gateway for credits | ✅ Done |
| Full-stack integration | ✅ Done |
| Deployment on Vercel | ✅ Done |

---

## 👨‍💻 Developer

**Muhammad Ahmed**
- 🌐 Portfolio: [ahmeddevx07.vercel.app](https://ahmeddevx07.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/your-linkedin](https://linkedin.com/in/ahmeddevx07)
- 🐙 GitHub: [github.com/AhmedDevx07](https://github.com/AhmedDevx07)

---

## 🏢 Internship

Built as part of the **Internee.pk Internship Program** — Pakistan's leading virtual internship platform.

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

Made with ❤️ by [Muhammad Ahmed](https://github.com/AhmedDevx07)

</div>
