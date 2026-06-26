# 🏥 Hospital Management System

A modern Hospital Management System built using **Next.js**, **MongoDB**, and **Groq AI**. The application helps manage hospital records while providing an AI-powered symptom assistant that offers safe health guidance based on patient symptoms.

---

## ✨ Features

* 🧑‍⚕️ Patient Management

  * Create and manage patient records
  * Store patient information
  * View patient details

* 🤖 AI Symptom Assistant

  * Enter patient symptoms
  * AI generates short and safe health guidance
  * Uses the Groq API (OpenAI-compatible)

* 📋 Modern Dashboard

  * Professional hospital-themed interface
  * Responsive design
  * Statistics cards
  * Quick access modules

* 🔒 Secure Configuration

  * API keys stored using environment variables
  * MongoDB connection stored securely
  * Secrets are excluded from Git using `.gitignore`

---

## 🛠️ Technologies Used

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* MongoDB Atlas
* Mongoose
* Groq AI API (OpenAI SDK)
* Vercel

---

## 🚀 Live Demo

**Website:**

https://internship-umber-eight.vercel.app

---

## 📂 Project Structure

```text
app/
├── api/
│   ├── ai/
│   └── patients/
├── patients/
├── page.tsx
├── layout.tsx
models/
lib/
public/
```

---

## 🤖 AI Feature

The AI Symptom Assistant allows users to enter patient symptoms and receive AI-generated health guidance.

The application:

* Sends the user's symptoms to the Groq API.
* Uses a system prompt to ensure responses are short, safe, and non-diagnostic.
* Returns the generated advice to the frontend.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root and add:

```env
GROQ_API_KEY=your_groq_api_key
MONGODB_URI=your_mongodb_connection_string
```

---

## 💻 Running Locally

Clone the repository:

```bash
git clone https://github.com/jenisia-tech/internship.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

---

## 📸 Screenshots

Add screenshots of:

* Dashboard
* Patients Page
* AI Symptom Assistant
* AI Response

---

## 👩‍💻 Author

**Jenisia Mary**

GitHub:

https://github.com/jenisia-tech

---

## 📄 License

This project was developed for internship learning purposes.
