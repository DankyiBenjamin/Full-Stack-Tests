# 🌾 FarmDirect – A Marketplace for Farmers and Buyers

**FarmDirect** is a full-stack web application that allows **farmers to register, upload products**, and **connect with buyers** who can browse and view product details.

---

## 📦 Technology Stack

### 🔙 Backend (Django + DRF)
- Django 4+
- Django REST Framework (DRF)
- JWT Authentication (`djangorestframework-simplejwt`)
- PostgreSQL (via Railway)
- CORS Headers
- Custom User Model (with farmer role)

### 🌐 Frontend (React + Vite)
- React 18+
- React Router
- Axios
- Vite
- Custom CSS (no UI framework)

---

## 🚀 Setup Instructions

### Prerequisites
- Python 3.10+ & pip
- Node.js & npm
- Railway account (for DB hosting)

---

### 1. Clone the Repository
```bash
git clone https://github.com/DankyiBenjamin/Full-Stack-Tests
cd farmdirect
```

---

### 2. Backend Setup (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Configure `.env` for Railway DB
```env
DATABASE_URL=your_railway_postgres_url
SECRET_KEY=your_secret_key
DEBUG=True
```

#### Migrate & Run Server
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

---

### 3. Frontend Setup (React + Vite)
```bash
cd ../frontend
npm install
npm run dev
```

App will run at `http://localhost:5173`.

---

## ✅ Features Implemented

### 👥 Authentication
- User registration with `is_farmer` toggle
- JWT-based login and token storage
- Role-based navbar links

### 🌾 For Farmers
- Upload products (name, price, category, description)
- View their own products
- Contact info shown to buyers (email + phone)

### 🛒 For Buyers
- Browse public marketplace
- Filter products by category
- Click to view product detail
- See farmer's name, contact info

### 🧭 Navigation
- Dynamic Navbar (My Products, Marketplace, My Info, Logout)
- Route protection using JWT

---

## ⚠️ Known Limitations

- No image uploads for products (text data only)
- No buyer-to-farmer messaging system yet
- Phone number not verified
- No admin dashboard
- Minimal form validation UX (e.g., password mismatch warning is basic)

---

## 📽️ Demo

A screen recording is included in the submission to show:

- Registration & login
- Farmer dashboard
- Product upload
- Marketplace filtering
- Detail view with farmer contact

---

## 📁 Folder Structure

```
farmdirect/
├── backend/       # Django project
├── frontend/      # React + Vite frontend
└── README.md
```

---

## ✨ Contributors

- [Dankyi Ben-Oni Ofosu ](https://github.com/DankyiBenjamin) – Full-stack developer
