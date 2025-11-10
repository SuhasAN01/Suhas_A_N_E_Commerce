🛍 MERN E-Commerce Website
A full-stack MERN e-commerce website that allows users to browse products, view detailed pages, and manage a shopping cart. Built with React.js, Node.js, Express.js, and MongoDB Atlas, featuring a responsive UI, RESTful APIs, and basic state management for a seamless shopping experience.

🚀 Project Overview

This project demonstrates a complete MERN Stack (MongoDB, Express, React, Node.js) architecture for building an online shopping platform where users can:

View all available products

Check detailed product information

Add or remove products from the shopping cart

View total cost and manage items in the cart

🧩 Tech Stack
Layer	Technology
Frontend	React.js, React Router, Context API, Axios
Backend	Node.js, Express.js
Database	MongoDB Atlas
Tools	Dotenv, Nodemon, CORS
⚙ System Architecture
Client (React)
⬇ HTTP Requests (Axios)
Server (Express + Node.js)
⬇ Database Queries
MongoDB Atlas (Cloud Database)
Frontend: Manages UI, routing, and cart state.
Backend: Handles product APIs and database connection.
Database: Stores product information.

📁 Folder Structure
/project-root
/client
/src
/components
/pages
/context
api.js
App.js
index.js
/server
/models
/routes
/controllers
server.js
TECH_DOC.md
README.md
🧠 Data Model Example

Collection: products
{
"_id": "ObjectId",
"name": "Classic Hoodie",
"price": 799,
"description": "Soft and comfortable cotton hoodie",
"image": "https://example.com/hoodie.jpg",
"stock": 25
}🛠 API Routes
Method	Endpoint	Description
GET	/api/products	Fetch all products
GET	/api/products/:id	Fetch a single product by ID
🧩 State Management

Context API is used to manage the cart state.

Actions include: ADD, REMOVE, CLEAR.

Cart data is temporary and resets on refresh (can be extended to localStorage).

💻 Setup & Installation
Clone the repository
git clone https://github.com/your-username/ecommerce-mern.git
cd ecommerce-mern
Backend setup
cd server
npm install
cd server
npm install

Create a .env file:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000

Run backend:

npm run dev
Frontend setup
🧾 Technical Highlights

RESTful APIs for modular backend development

Clean React structure with reusable components

Responsive layout for desktop & mobile

Uses MongoDB Atlas for cloud database hosting

Secure .env configuration for environment variables
🧠 Prompts Used for Generating Tech Documentation and Code Base
1️⃣ Technical Architecture Documentation Prompt
Generate a detailed TECH_DOC.md for a MERN e-commerce website.
Include project overview, architecture diagram, folder structure, database schema, API routes,
state management explanation, setup instructions, and best practices for deployment and security.
2️⃣ Backend Codebase Generation Prompt
Generate backend code for an E-Commerce web app using Node.js, Express.js, and MongoDB Atlas.
Include:
- server.js file to connect with MongoDB using dotenv
- Product model schema
- Routes for fetching all products and product by ID
- Proper RESTful APIs, JSON parsing, and CORS enabled
- Package.json setup with nodemon for development
Ensure code readability and modular structure.
3️⃣ Frontend Codebase Generation Prompt
Generate a complete React.js frontend for an E-Commerce website.
Include:
- Home page to list all products
- Product Details page
- Cart page
- React Router for navigation
- Context API for managing cart state
- Axios for API integration
- Clean, responsive UI design using basic CSS or inline styles
Use environment variable REACT_APP_API_URL for backend connection.
4️⃣ Combined Project Prompt
Integrate the React frontend and Express backend to form a complete MERN e-commerce application.
Provide folder structure, connection setup, and commands to run both servers concurrently.
Generate a README.md summarizing features, tech stack, and setup instructions.
🧩 Future Enhancements

Add authentication (Login / Signup)

Integrate payment gateway

Add product search & filter

Persistent cart using localStorage or database

🧑‍💻 Author

Suhas A N
MCA Student | CMR Institute of Technology, Bangalore
Passionate about web development & building real-world applications