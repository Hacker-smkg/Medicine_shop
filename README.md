# MediShop — AI-Powered Online Medicine Store

A modern e-commerce platform for purchasing medicines, enhanced with **MediBot** — an AI-powered chatbot (via Groq/Llama-3) for symptom-based health assistance.

![CI](https://github.com/Hacker-smkg/Medicine_shop/actions/workflows/ci.yml/badge.svg)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-AI_Service-009688)

## 🚀 Live Links
- **Frontend**: [Vercel Deployment](https://medicine-shop-frontend-6ofvcl60k-hackersmkgs-projects.vercel.app)
- **Backend API**: [Render Deployment](https://medicine-shop-backend-r1ai.onrender.com)

## ✨ Key Features
- **E-Commerce**: JWT auth, product catalogue, cart, orders.
- **MediBot AI**: Symptom-based suggestions & medicine info powered by `llama-3.1-8b-instant` via Groq.

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, CSS
- **Backend**: Node.js, Express, MongoDB (Atlas)
- **AI Service**: Python, FastAPI, Groq API

## 🚀 Getting Started (Docker)
1. Clone repo & copy `.env.example` to `.env` (add your `GROQ_API_KEY` & `MONGO_URI`).
2. Run `docker-compose up --build`
3. Access UI at `http://localhost:3000`

## 👨‍💻 Author
**Soumya Ganguly** · [GitHub](https://github.com/Hacker-smkg) · [LinkedIn](https://linkedin.com/in/soumya-ganguly-799676249)

> *Disclaimer: MediBot provides general info only. Always consult a licensed doctor.*
