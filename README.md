# 🛒 Grocerie R Us

Welcome to **Grocerie R Us** — a full-stack grocery app built from the original task manager base and reworked into a cart system with full CRUD functionality and CI/CD setup.

At a high level, the app lets users browse items, add them to a cart, update quantities, and remove them. Everything is tied to user accounts, so each person has their own cart rather than a shared one.

==================================================================

## 📚 Table of Contents

- Overview
- Requirements
- Tech Stack
- Features
- Running Locally
- CI/CD & Deployment
- Access Details
- Notes

==================================================================

## 📌 Overview

This project is essentially a **conversion of the task manager into a grocery system**.

Instead of tasks, the core focus becomes:

- Grocery items 🛍️
- Cart operations ➕➖
- User-specific data 🔐

So the logic stays similar, but the purpose changes completely.

Core functionality includes:

- User authentication
- Browsing grocery items
- Full cart CRUD (add, update, delete)
- Persistent data stored in MongoDB

The project is also structured around **CI/CD deployment using GitHub Actions and AWS EC2**, so it’s not just a local app — it’s built to be deployed properly.

==================================================================

## ⚙️ Requirements

Before running the project, make sure you have:

- Node.js
- Npm
- MongoDB (Atlas recommended)
- Git

⚠️ If MongoDB isn’t set up correctly, the app will load but actions like adding to cart won’t work — everything depends on the database connection.

==================================================================

## 🧱 Tech Stack

**Frontend**

- React
- Axios
- React Router

**Backend**

- Node.js
- Express
- MongoDB (Mongoose)

**Testing**

- Mocha
- Chai
- Sinon

**CI/CD / Deployment**

- GitHub Actions ⚙️
- AWS EC2 ☁️
- PM2 🔁

==================================================================

## ✨ Features

- Register / Login system 🔐
- Browse grocery items 🛒
- Add items to cart
- Increase / Decrease quantity ➕➖
- Remove items from cart ❌
- Cart stored per user (not shared)
- Backend tests implemented 🧪
- CI/CD pipeline configured

==================================================================

## ▶️ Running Locally

### 1. Install dependencies

From the root folder:

```bash id="xy8dck"
npm install
npm install --prefix backend
npm install --prefix frontend
```

==================================================================

### 2. Setup environment variables

Create a `.env` file inside `backend/`:

```env id="m9y6de"
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

If this step is wrong or missing, backend routes will fail or not respond properly.

==================================================================

### 3. Run the app

```bash id="taos3p"
npm run dev
```

This will:

- Start the backend server
- Start the frontend React app

Once running:

- Frontend handles UI
- Backend handles API + database

==================================================================

### 4. Run backend tests

```bash id="nthnx7"
npm test --prefix backend
```

Runs all controller tests (cart + auth logic).

==================================================================

### 5. Build frontend (production)

```bash id="coe9m0"
npm run build --prefix frontend
```

Creates the production build used during deployment.

==================================================================

## 🚀 CI/CD & Deployment

This project includes a GitHub Actions workflow that automates the full pipeline.

Workflow file:

```id="cneu5j"
.github/workflows/grocery-ci.yml
```

### What the pipeline does

On push to `main`:

- Installs backend dependencies
- Installs frontend dependencies
- Runs backend tests 🧪
- Builds the frontend
- Runs on EC2 (self-hosted runner)
- Restarts the app using PM2 🔁

### How it fits together

- GitHub → triggers the workflow
- EC2 → runs the workflow
- PM2 → keeps the app running

So instead of manually running everything, a push handles it.

==================================================================

### EC2 Setup (summary)

- Ubuntu instance
- Node.js + npm installed
- PM2 installed
- GitHub self-hosted runner configured
- App runs continuously via PM2

==================================================================

## 🔐 Access Details

There is no default account.

Users:

- Register
- Then log in

Each account gets its own cart.

==================================================================

## 🧠 Notes

- Some `npm audit` warnings may appear — these come from third-party packages and don’t affect core functionality
- Dependencies were not force-updated to avoid breaking working code
- Structure and workflow follow the assignment/tutorial requirements closely

==================================================================

## ✅ Status

- CRUD functionality complete
- Backend tests implemented and passing
- CI/CD workflow configured
- Ready for EC2 deployment

==================================================================
