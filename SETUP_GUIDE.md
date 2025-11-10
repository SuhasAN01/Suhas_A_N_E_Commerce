# 🚀 Setup Guide

## Quick Start Guide for E-Commerce Website

This guide will help you set up and run the E-Commerce application on your local machine.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB Atlas Account** (free) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - [Download](https://git-scm.com/)

---

## Step 1: Clone or Download the Project

If you have the project in a repository:
```bash
git clone <repository-url>
cd E_Commerce
```

If you have the project files, navigate to the project directory:
```bash
cd E_Commerce
```

---

## Step 2: MongoDB Atlas Setup

### 2.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new organization (or use default)
4. Create a new project (or use default)

### 2.2 Create a Cluster

1. Click "Build a Database"
2. Choose "Free" tier (M0)
3. Select a cloud provider and region (choose closest to you)
4. Click "Create Cluster"
5. Wait for cluster to be created (2-3 minutes)

### 2.3 Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (save these!)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### 2.4 Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 2.5 Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `ecommerce` (or your preferred database name)

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

---

## Step 3: Backend Setup

### 3.1 Navigate to Backend Directory

```bash
cd backend
```

### 3.2 Install Dependencies

```bash
npm install
```

This will install:
- express
- mongoose
- cors
- dotenv
- express-validator

### 3.3 Create Environment File

Create a `.env` file in the `backend` directory:

```bash
# Windows (PowerShell)
New-Item -Path .env -ItemType File

# Mac/Linux
touch .env
```

### 3.4 Configure Environment Variables

Open `.env` file and add:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
NODE_ENV=development
```

Replace `your_mongodb_atlas_connection_string_here` with your actual MongoDB Atlas connection string from Step 2.5.

### 3.5 Seed the Database (Optional)

Populate the database with sample products:

```bash
npm run seed
```

This will add 12 sample products to your database.

### 3.6 Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server should start on `http://localhost:5000`

You should see:
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server is running on port 5000
```

---

## Step 4: Frontend Setup

### 4.1 Open a New Terminal

Keep the backend server running and open a new terminal window.

### 4.2 Navigate to Frontend Directory

```bash
cd frontend
```

### 4.3 Install Dependencies

```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- vite
- tailwindcss
- And other dev dependencies

### 4.4 Configure Environment Variables (Optional)

Create a `.env` file in the `frontend` directory:

```bash
# Windows (PowerShell)
New-Item -Path .env -ItemType File

# Mac/Linux
touch .env
```

Add to `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** If you don't create this file, the app will use the default value (`http://localhost:5000/api`).

### 4.5 Start the Frontend Development Server

```bash
npm run dev
```

The app should start on `http://localhost:3000`

You should see:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

---

## Step 5: Verify Installation

### 5.1 Check Backend

1. Open browser and go to `http://localhost:5000/api/health`
2. You should see:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### 5.2 Check Frontend

1. Open browser and go to `http://localhost:3000`
2. You should see the E-Commerce homepage with products (if seeded)

### 5.3 Test API Endpoints

You can test the API using:
- Browser: `http://localhost:5000/api/products`
- Postman
- curl: `curl http://localhost:5000/api/products`

---

## Step 6: Troubleshooting

### Backend Issues

**Problem: MongoDB connection error**
- Solution: Check your MongoDB Atlas connection string
- Verify IP address is whitelisted
- Check database user credentials

**Problem: Port already in use**
- Solution: Change PORT in `.env` file
- Or kill the process using port 5000

**Problem: Module not found**
- Solution: Run `npm install` again in backend directory

### Frontend Issues

**Problem: Cannot connect to backend**
- Solution: Verify backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Check CORS settings in backend

**Problem: Products not loading**
- Solution: Verify backend is running
- Check browser console for errors
- Verify database has products (run seed script)

**Problem: Tailwind styles not applying**
- Solution: Restart the dev server
- Check `tailwind.config.js` content paths

---

## Step 7: Development Workflow

### Running Both Servers

You need to run both servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Making Changes

- **Backend changes**: Server auto-reloads with `npm run dev`
- **Frontend changes**: Vite hot-reloads automatically
- **Database changes**: Restart backend server if needed

### Adding New Products

1. Use the seed script: `npm run seed` (in backend directory)
2. Use the API: POST to `http://localhost:5000/api/products`
3. Use MongoDB Atlas dashboard: Add documents manually

---

## Step 8: Next Steps

1. **Customize Products**: Modify `backend/seed.js` to add your own products
2. **Styling**: Customize Tailwind CSS in `frontend/tailwind.config.js`
3. **Features**: Add new features following the existing code structure
4. **Deployment**: Follow deployment instructions in `README.md`

---

## Common Commands

### Backend
```bash
npm install          # Install dependencies
npm start           # Start production server
npm run dev         # Start development server (auto-reload)
npm run seed        # Seed database with sample products
```

### Frontend
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

---

## Need Help?

- Check the `README.md` for detailed documentation
- Check the `TECHNICAL_ARCHITECTURE.md` for architecture details
- Review error messages in terminal and browser console
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas is accessible

---

## Success!

If you've completed all steps, you should have:
- ✅ Backend server running on port 5000
- ✅ Frontend app running on port 3000
- ✅ Database connected and seeded
- ✅ Products visible on homepage
- ✅ Cart functionality working
- ✅ Checkout page accessible

Happy coding! 🎉

