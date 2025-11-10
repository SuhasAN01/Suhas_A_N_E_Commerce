# 📡 API Examples

This document provides examples of how to use the E-Commerce API endpoints.

## Base URL

**Development:** `http://localhost:5000/api`  
**Production:** `https://your-backend-url.com/api`

---

## Products API

### Get All Products

**Request:**
```http
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "price": 129.99,
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "category": "electronics",
      "stock": 50,
      "rating": 4.5,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**cURL:**
```bash
curl http://localhost:5000/api/products
```

**JavaScript (Axios):**
```javascript
const response = await axios.get('http://localhost:5000/api/products');
console.log(response.data);
```

---

### Get Single Product

**Request:**
```http
GET /api/products/:id
```

**Example:**
```http
GET /api/products/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 129.99,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    "category": "electronics",
    "stock": 50,
    "rating": 4.5,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**cURL:**
```bash
curl http://localhost:5000/api/products/507f1f77bcf86cd799439011
```

**JavaScript (Axios):**
```javascript
const productId = "507f1f77bcf86cd799439011";
const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
console.log(response.data);
```

---

### Create Product

**Request:**
```http
POST /api/products
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "electronics",
  "stock": 100,
  "rating": 4.0
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "image": "https://example.com/image.jpg",
    "category": "electronics",
    "stock": 100,
    "rating": 4.0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "image": "https://example.com/image.jpg",
    "category": "electronics",
    "stock": 100
  }'
```

**JavaScript (Axios):**
```javascript
const product = {
  name: "New Product",
  description: "Product description",
  price: 99.99,
  image: "https://example.com/image.jpg",
  category: "electronics",
  stock: 100
};

const response = await axios.post('http://localhost:5000/api/products', product);
console.log(response.data);
```

**Error Response (Validation Error):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "msg": "Product name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

---

## Cart API

### Get Cart

**Request:**
```http
GET /api/cart
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f191e810c19729de860ea",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Wireless Headphones",
          "description": "High-quality wireless headphones",
          "price": 129.99,
          "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
          "category": "electronics",
          "stock": 50,
          "rating": 4.5
        },
        "quantity": 2,
        "price": 129.99
      }
    ],
    "total": 259.98,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**cURL:**
```bash
curl http://localhost:5000/api/cart
```

**JavaScript (Axios):**
```javascript
const response = await axios.get('http://localhost:5000/api/cart');
console.log(response.data);
```

---

### Add Item to Cart

**Request:**
```http
POST /api/cart
Content-Type: application/json
```

**Request Body:**
```json
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
        "_id": "507f1f77bcf86cd799439013",
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Wireless Headphones",
          "price": 129.99
        },
        "quantity": 2,
        "price": 129.99
      }
    ],
    "total": 259.98,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "507f1f77bcf86cd799439011",
    "quantity": 2
  }'
```

**JavaScript (Axios):**
```javascript
const cartItem = {
  productId: "507f1f77bcf86cd799439011",
  quantity: 2
};

const response = await axios.post('http://localhost:5000/api/cart', cartItem);
console.log(response.data);
```

**Error Response (Insufficient Stock):**
```json
{
  "success": false,
  "message": "Insufficient stock"
}
```

**Error Response (Product Not Found):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### Remove Item from Cart

**Request:**
```http
DELETE /api/cart/:id
```

**Example:**
```http
DELETE /api/cart/507f1f77bcf86cd799439013
```

**Response:**
```json
{
  "success": true,
  "message": "Item removed from cart",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "items": [],
    "total": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/cart/507f1f77bcf86cd799439013
```

**JavaScript (Axios):**
```javascript
const itemId = "507f1f77bcf86cd799439013";
const response = await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
console.log(response.data);
```

**Error Response (Item Not Found):**
```json
{
  "success": false,
  "message": "Item not found in cart"
}
```

---

### Update Cart Item Quantity

**Request:**
```http
PUT /api/cart/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "quantity": 3
}
```

**Example:**
```http
PUT /api/cart/507f1f77bcf86cd799439013
```

**Response:**
```json
{
  "success": true,
  "message": "Cart item updated",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Wireless Headphones",
          "price": 129.99
        },
        "quantity": 3,
        "price": 129.99
      }
    ],
    "total": 389.97,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/cart/507f1f77bcf86cd799439013 \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 3
  }'
```

**JavaScript (Axios):**
```javascript
const itemId = "507f1f77bcf86cd799439013";
const response = await axios.put(`http://localhost:5000/api/cart/${itemId}`, {
  quantity: 3
});
console.log(response.data);
```

---

## Health Check

### Get Server Health

**Request:**
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

**cURL:**
```bash
curl http://localhost:5000/api/health
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "msg": "Error message",
      "param": "fieldName",
      "location": "body"
    }
  ]
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Something went wrong!",
  "error": "Error details (development only)"
}
```

---

## Testing with Postman

1. **Import Collection:**
   - Create a new collection in Postman
   - Add requests for each endpoint
   - Set base URL: `http://localhost:5000/api`

2. **Example Requests:**
   - GET `/products`
   - GET `/products/:id`
   - POST `/products` (with body)
   - GET `/cart`
   - POST `/cart` (with body)
   - DELETE `/cart/:id`
   - PUT `/cart/:id` (with body)

3. **Environment Variables:**
   - Create an environment in Postman
   - Add variable: `base_url` = `http://localhost:5000/api`
   - Use `{{base_url}}/products` in requests

---

## Testing with cURL

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Get Single Product
```bash
curl http://localhost:5000/api/products/PRODUCT_ID
```

### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 29.99,
    "image": "https://example.com/image.jpg",
    "category": "electronics",
    "stock": 50
  }'
```

### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PRODUCT_ID",
    "quantity": 1
  }'
```

### Get Cart
```bash
curl http://localhost:5000/api/cart
```

### Remove from Cart
```bash
curl -X DELETE http://localhost:5000/api/cart/ITEM_ID
```

### Update Cart Item
```bash
curl -X PUT http://localhost:5000/api/cart/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 2
  }'
```

---

## Notes

- All requests should include `Content-Type: application/json` header for POST/PUT requests
- Product IDs and Cart Item IDs are MongoDB ObjectIds
- Quantity must be a positive integer (minimum 1)
- Price must be a positive number
- Stock must be a non-negative integer
- All timestamps are in ISO 8601 format (UTC)

