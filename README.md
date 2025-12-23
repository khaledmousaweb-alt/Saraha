# Saraha App 📨

Saraha App is an anonymous messaging application that allows users to receive honest messages without revealing the sender’s identity.  
The application focuses on privacy, simplicity, and freedom of expression.

> Say what you want. Stay anonymous.

---

## Overview

Saraha App enables users to create a unique personal link and share it with others.  
Anyone can open the link and send a message anonymously without registration or login.

No sender identity, IP address, or personal data is stored.

---

## Features

- Fully anonymous messaging
- Unique shareable link for each user
- Unlimited incoming messages
- Private dashboard to view messages
- Message deletion
- Optional spam protection
- RESTful API
- Scalable backend architecture

---

## How It Works

1. User creates an account
2. A unique Saraha link is generated
3. Anyone can send a message anonymously
4. Messages are stored securely
5. User logs in to read messages

All messages are anonymous by design.

---

## Architecture

Client (Frontend)  
↓  
Backend API (Node.js / Express)  
↓  
Database (MongoDB or SQL)

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose (or SQL)
- JWT Authentication
- dotenv

### Frontend
- Angular / HTML / CSS / JavaScript

### Tools
- Git & GitHub
- npm
- Postman
- REST API

---

## Project Structure

Saraha_App/  
├── src/  
│   ├── controllers/  
│   ├── routes/  
│   ├── models/  
│   ├── middlewares/  
│   └── app.js  
├── frontend/  
├── index.js  
├── package.json  
├── .env  
└── README.md  

---

## Installation & Setup

### Clone Repository
```bash
git clone https://github.com/khaledmousaweb-alt/Saraha.git
cd Saraha
