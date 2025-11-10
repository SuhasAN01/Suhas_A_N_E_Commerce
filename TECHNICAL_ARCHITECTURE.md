# 🏗️ Technical Architecture Document

## E-Commerce Website - System Architecture

---

## 1. System Overview

### 1.1 Architecture Pattern
This E-Commerce application follows a **3-tier architecture**:
- **Presentation Layer**: React.js frontend
- **Application Layer**: Express.js REST API backend
- **Data Layer**: MongoDB database

### 1.2 End-to-End Flow

```
User Browser
    ↓
React Frontend (Port 3000)
    ↓ HTTP Requests
Express.js Backend (Port 5000)
    ↓ Mongoose ODM
MongoDB Atlas (Cloud Database)
    ↓
Response Flow (Reverse)
```

### 1.3 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React.js | UI components and user interactions |
| Frontend | React Router DOM | Client-side routing |
| Frontend | Tailwind CSS | Styling and responsive design |
| Frontend | Context API | Global state management (cart) |
| Frontend | Axios | HTTP client for API communication |
| Frontend | Vite | Build tool and development server |
| Backend | Node.js | JavaScript runtime |
| Backend | Express.js | Web application framework |
| Backend | Mongoose | MongoDB object modeling |
| Backend | Express Validator | Input validation middleware |
| Backend | CORS | Cross-origin resource sharing |
| Database | MongoDB Atlas | Cloud-hosted NoSQL database |

---

## 2. Component Diagram

### 2.1 Frontend Components

```
App.jsx
├── CartProvider (Context)
│   └── CartContext.jsx
├── Router
│   └── Routes
│       ├── Home.jsx
│       │   └── ProductCard.jsx (multiple)
│       ├── ProductDetails.jsx
│       ├── Cart.jsx
│       │   └── CartItem.jsx (multiple)
│       └── Checkout.jsx
└── Navbar.jsx
```

### 2.2 Backend Components

```
server.js
├── Middleware
│   ├── CORS
│   ├── JSON Parser
│   └── Error Handler
├── Routes
│   ├── productRoutes.js
│   │   └── productController.js
│   └── cartRoutes.js
│       └── cartController.js
└── Database
    └── MongoDB Atlas
        ├── Product Collection
        └── Cart Collection
```

---

## 3. Data Flow Diagram

### 3.1 Product Browsing Flow

```
User Action: Browse Products
    ↓
Home.jsx Component
    ↓
Axios GET /api/products
    ↓
Express Router (productRoutes.js)
    ↓
Product Controller (getProducts)
    ↓
Mongoose Query (Product.find())
    ↓
MongoDB Atlas (Product Collection)
    ↓
Response: Array of Products
    ↓
React State Update
    ↓
Render ProductCard Components
```

### 3.2 Add to Cart Flow

```
User Action: Add Product to Cart
    ↓
ProductDetails.jsx or ProductCard.jsx
    ↓
CartContext.addToCart(productId, quantity)
    ↓
Axios POST /api/cart
    ↓
Express Router (cartRoutes.js)
    ↓
Cart Controller (addToCart)
    ↓
Validation & Stock Check
    ↓
Mongoose Operations
    ├── Find/Create Cart
    ├── Update Cart Items
    └── Calculate Total
    ↓
MongoDB Atlas (Cart Collection)
    ↓
Response: Updated Cart
    ↓
CartContext State Update
    ↓
UI Update (Cart Badge, Cart Page)
```

### 3.3 Checkout Flow

```
User Action: Submit Checkout Form
    ↓
Checkout.jsx
    ↓
Form Validation (Client-side)
    ↓
Mock Order Processing
    ↓
CartContext.clearCart()
    ↓
Axios DELETE /api/cart (if needed)
    ↓
Navigate to Home Page
```

---

## 4. Database Schema

### 4.1 Product Schema

```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  image: String (required),
  category: String (required),
  stock: Number (required, min: 0),
  rating: Number (min: 0, max: 5),
  createdAt: Date,
  updatedAt: Date
}
```

### 4.2 Cart Schema

```javascript
{
  _id: ObjectId,
  items: [
    {
      _id: ObjectId,
      productId: ObjectId (ref: Product),
      quantity: Number (required, min: 1),
      price: Number (required)
    }
  ],
  total: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### 4.3 Database Relationships

- **Cart → Product**: One-to-Many relationship (Cart items reference Product documents)
- **Cart**: Single cart document (can be extended to support multiple users)

---

## 5. API Design

### 5.1 RESTful Endpoints

#### Products API

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/products` | Get all products | - | `{ success: true, count: number, data: Product[] }` |
| GET | `/api/products/:id` | Get single product | - | `{ success: true, data: Product }` |
| POST | `/api/products` | Create product | `{ name, description, price, image, category, stock }` | `{ success: true, data: Product }` |

#### Cart API

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/cart` | Get cart items | - | `{ success: true, data: Cart }` |
| POST | `/api/cart` | Add item to cart | `{ productId, quantity }` | `{ success: true, data: Cart }` |
| DELETE | `/api/cart/:id` | Remove item from cart | - | `{ success: true, data: Cart }` |
| PUT | `/api/cart/:id` | Update cart item | `{ quantity }` | `{ success: true, data: Cart }` |

### 5.2 HTTP Status Codes

| Status Code | Meaning | Usage |
|-------------|---------|-------|
| 200 | OK | Successful GET, PUT, DELETE requests |
| 201 | Created | Successful POST requests (resource created) |
| 400 | Bad Request | Validation errors, invalid input |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server errors, database errors |

### 5.3 Request/Response Examples

#### Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 999.99,
      "image": "https://example.com/laptop.jpg",
      "category": "electronics",
      "stock": 50,
      "rating": 4.5,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Add to Cart
```http
POST /api/cart
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Laptop",
          "price": 999.99
        },
        "quantity": 2,
        "price": 999.99
      }
    ],
    "total": 1999.98,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 5.4 Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information (development only)"
}
```

---

## 6. State Management

### 6.1 Frontend State Management

**Cart State (Context API)**
```javascript
{
  cart: {
    items: [],
    total: 0
  },
  loading: boolean,
  error: string | null,
  cartItemCount: number,
  addToCart: function,
  removeFromCart: function,
  updateCartItem: function,
  clearCart: function
}
```

### 6.2 State Flow

1. **Initial Load**: Cart state fetched from backend on app mount
2. **Add to Cart**: Local state updated → API call → Backend update → State refresh
3. **Remove from Cart**: API call → Backend update → State refresh
4. **Update Quantity**: API call → Backend update → State refresh

---

## 7. Security Considerations

### 7.1 Input Validation
- **Backend**: Express Validator for all inputs
- **Frontend**: Client-side validation for UX
- **Database**: Mongoose schema validation

### 7.2 CORS Configuration
- Backend configured to accept requests from frontend origin
- Can be restricted to specific domains in production

### 7.3 Error Handling
- Centralized error handling middleware
- Error messages don't expose sensitive information
- Detailed errors only in development mode

### 7.4 Future Security Enhancements
- Authentication and authorization (JWT)
- Rate limiting
- Input sanitization
- HTTPS enforcement
- Environment variable protection

---

## 8. Deployment Strategy

### 8.1 Frontend Deployment (Vercel)

**Steps:**
1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Set environment variables:
   - `VITE_API_URL`: Backend API URL
5. Deploy

**Benefits:**
- Automatic deployments on git push
- CDN distribution
- SSL certificates
- Custom domain support

### 8.2 Backend Deployment (Render)

**Steps:**
1. Push code to GitHub repository
2. Create new Web Service in Render
3. Connect GitHub repository
4. Configure settings:
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment: Node
5. Set environment variables:
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `PORT`: Server port (Render provides)
   - `NODE_ENV`: `production`
6. Deploy

**Benefits:**
- Automatic deployments
- SSL certificates
- Health checks
- Logging and monitoring

### 8.3 Database (MongoDB Atlas)

**Configuration:**
1. Create cluster in MongoDB Atlas
2. Configure network access (IP whitelist)
3. Create database user
4. Get connection string
5. Update environment variables in backend

**Production Considerations:**
- Enable backup and monitoring
- Set up alerts
- Configure IP whitelist for Render IPs
- Use connection pooling
- Enable database encryption

### 8.4 Environment Variables

**Frontend (Vercel)**
```
VITE_API_URL=https://your-backend.onrender.com/api
```

**Backend (Render)**
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ecommerce
PORT=10000
NODE_ENV=production
```

---

## 9. Performance Optimization

### 9.1 Frontend Optimizations
- Code splitting with React Router
- Image optimization (lazy loading)
- Minimal re-renders with Context API
- Vite build optimization

### 9.2 Backend Optimizations
- Database indexing on frequently queried fields
- Connection pooling
- Response caching (can be added)
- Compressed responses

### 9.3 Database Optimizations
- Indexed fields: `_id`, `category`, `name`
- Efficient queries with projection
- Aggregation pipelines for complex queries

---

## 10. Testing Strategy

### 10.1 Manual Testing
- **Product Browsing**: Search, filter, pagination
- **Cart Operations**: Add, update, remove items
- **Checkout**: Form validation, order submission
- **Responsive Design**: Mobile, tablet, desktop

### 10.2 Future Testing Enhancements
- Unit tests (Jest, React Testing Library)
- Integration tests (API endpoints)
- E2E tests (Cypress, Playwright)
- Load testing (Artillery, k6)

---

## 11. Monitoring and Logging

### 11.1 Current Implementation
- Console logging for errors
- Error tracking in controllers
- Health check endpoint

### 11.2 Future Enhancements
- Application monitoring (New Relic, Datadog)
- Error tracking (Sentry)
- Analytics (Google Analytics, Mixpanel)
- Performance monitoring (Lighthouse)

---

## 12. Scalability Considerations

### 12.1 Current Architecture
- Single server backend
- Single database instance
- Stateless API design

### 12.2 Scalability Improvements
- **Horizontal Scaling**: Load balancer, multiple server instances
- **Database Scaling**: Replica sets, sharding
- **Caching**: Redis for frequently accessed data
- **CDN**: Static asset delivery
- **Microservices**: Separate services for different features

---

## 13. Future Enhancements

### 13.1 Features
- User authentication and authorization
- Product reviews and ratings
- Order history
- Payment integration (Stripe, PayPal)
- Admin dashboard
- Email notifications
- Product recommendations
- Wishlist functionality

### 13.2 Technical Improvements
- TypeScript migration
- GraphQL API
- Real-time updates (WebSockets)
- Progressive Web App (PWA)
- Server-side rendering (Next.js)
- Docker containerization
- CI/CD pipeline

---

## 14. Conclusion

This E-Commerce application demonstrates a complete MERN stack implementation with:
- Clean architecture and separation of concerns
- RESTful API design
- Modern React patterns
- Responsive UI/UX
- Comprehensive error handling
- Production-ready deployment strategy

The architecture is designed to be scalable, maintainable, and extensible for future enhancements.

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Author:** Development Team

