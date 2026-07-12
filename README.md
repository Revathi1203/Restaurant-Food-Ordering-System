# 🍽️ Restaurant Food Ordering System

A full-stack Restaurant Food Ordering Web Application built using **React**, **FastAPI**, and **SQLite**. The application supports two user roles: **Admin** and **Customer**, and includes an **AI-powered natural language menu search** feature.

---

# 📌 Project Objective

The objective of this project is to develop a restaurant web application where:

- Customers can browse the menu, search dishes using natural language, add items to a cart, place orders, and track order status.
- Admins can manage menu items, monitor incoming orders, update order status, and view dashboard analytics.

---

# 🚀 Tech Stack

## Frontend
- React.js
- React Router DOM
- Bootstrap 5
- Axios

## Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic

## Database
- SQLite

## AI Component
- Natural Language Menu Search
- Keyword matching with relevance ranking

---

# 🏗️ System Architecture

```text
                React Frontend
        (Admin & Customer Interfaces)
                    |
                    |
              REST API Requests
                    |
                    v
              FastAPI Backend
        --------------------------
        Authentication
        Menu Management
        Order Management
        AI Search
        Dashboard APIs
                    |
                    |
              SQLAlchemy ORM
                    |
                    v
              SQLite Database
```

---

# ✨ Features

## Customer

- Login
- Browse menu by category
- View food items
- AI-powered menu search
- Add items to cart
- Place orders
- Track order status

---

## Admin

- Login
- Dashboard
- Add menu items
- Edit menu items
- Delete menu items
- Toggle availability
- View all orders
- Update order status
- View daily revenue
- View popular items

---

# 🤖 AI Menu Search

Customers can search using natural language.

Example queries:

- something spicy and vegetarian under 200 rupees
- light lunch that is not fried
- non vegetarian biryani
- cold beverage
- sweet dessert

The backend analyzes the query and returns matching available dishes ranked by relevance.

---

# 📦 Order Workflow

```
Placed
    ↓
Confirmed
    ↓
Preparing
    ↓
Ready
    ↓
Picked Up
```

The Admin updates the order status, and Customers can track the current status from the Orders page.

---

# 📂 Project Structure

```
Restaurant-Food-Ordering-System/

│── backend/
│     ├── app/
│     ├── routers/
│     ├── models.py
│     ├── database.py
│     ├── main.py
│     └── requirements.txt
│
│── frontend/
│     ├── src/
│     ├── public/
│     ├── package.json
│     └── vite.config.js
│
│── README.md
```

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/your-username/restaurant-food-ordering-system.git
```

---

## 2. Backend Setup

Navigate to backend folder

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate virtual environment

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI server

```bash
uvicorn main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

## 3. Frontend Setup

Navigate to frontend folder

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run application

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🗄️ Database

The project uses **SQLite**.

Main tables include:

- Menu Items
- Orders
- Order Items

SQLAlchemy ORM is used to interact with the database.

---

# 📊 Dashboard

The Admin Dashboard displays:

- Total Revenue
- Orders by Status
- Popular Menu Items

---

# 🔐 Authentication

A simple role-based login system is implemented for demonstration purposes.

Two roles:

- Admin
- Customer

Each role is redirected to its respective interface after login.

---

# 📌 Assumptions Made

- Authentication is implemented using predefined credentials for demonstration instead of a full user registration system.
- SQLite is used as the database because it is lightweight and suitable for academic projects.
- The AI search uses keyword-based matching and relevance scoring rather than a large language model.
- Customers can view the current status of all placed orders.
- Images for food items are not stored in the database.

---

# 🔮 Future Improvements

- JWT-based authentication
- User registration
- Customer profiles
- Address management
- Payment gateway integration
- Food images
- Ratings and reviews
- Online deployment
- Email/SMS notifications

---

# 👨‍💻 Developed By

Suragani Revathi

Restaurant Food Ordering System

React • FastAPI • SQLite • AI Menu Search
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
