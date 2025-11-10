import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'electronics',
    stock: 50,
    rating: 4.5,
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and smartphone notifications.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'electronics',
    stock: 30,
    rating: 4.7,
  },
  {
    name: 'Laptop Backpack',
    description: 'Durable laptop backpack with multiple compartments, USB charging port, and water-resistant material.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'accessories',
    stock: 100,
    rating: 4.3,
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking, long battery life, and comfortable design.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    category: 'electronics',
    stock: 75,
    rating: 4.4,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with customizable keys, blue switches, and durable construction.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    category: 'electronics',
    stock: 40,
    rating: 4.6,
  },
  {
    name: 'USB-C Cable',
    description: 'Fast charging USB-C cable, 6 feet long, compatible with all USB-C devices.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    category: 'accessories',
    stock: 200,
    rating: 4.2,
  },
  {
    name: 'Phone Stand',
    description: 'Adjustable phone stand made of aluminum, compatible with all smartphone sizes.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    category: 'accessories',
    stock: 150,
    rating: 4.1,
  },
  {
    name: 'Portable Power Bank',
    description: '10000mAh portable power bank with fast charging, dual USB ports, and LED indicator.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c8?w=500',
    category: 'electronics',
    stock: 60,
    rating: 4.5,
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness, color temperature control, and USB charging port.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: 'furniture',
    stock: 80,
    rating: 4.4,
  },
  {
    name: 'Monitor Stand',
    description: 'Ergonomic monitor stand with storage space, cable management, and adjustable height.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'furniture',
    stock: 45,
    rating: 4.3,
  },
  {
    name: 'Webcam',
    description: 'HD webcam with autofocus, built-in microphone, and privacy shutter.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500',
    category: 'electronics',
    stock: 35,
    rating: 4.6,
  },
  {
    name: 'Desk Organizer',
    description: 'Bamboo desk organizer with multiple compartments for pens, papers, and office supplies.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500',
    category: 'furniture',
    stock: 90,
    rating: 4.2,
  },
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();

