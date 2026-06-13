import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Product from "../models/Product.js";

const DEFAULT_PRODUCTS = [
  {
    title: "Lenovo ThinkPad T480s",
    brand: "Lenovo",
    price: 24999,
    usageCondition: "1.5 Years Used (Grade A - Minor wear on touchpad, screen pristine)",
    description: "Enterprise-grade business laptop known for its legendary durability and keyboard comfort. Fully serviced, thermal paste replaced, and stress-tested.",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    specifications: {
      processor: "Intel Core i5-8350U (Quad Core, up to 3.6GHz)",
      ram: "16GB DDR4",
      storage: "512GB NVMe M.2 SSD",
      graphics: "Intel UHD Graphics 620",
      screenSize: '14" FHD (1920x1080) IPS Anti-glare',
      os: "Windows 11 Pro",
    },
  },
  {
    title: "Apple MacBook Pro 13 (2019)",
    brand: "Apple",
    price: 45999,
    usageCondition: "2 Years Used (Grade A- - Subtle scuff on bottom shell, Battery health 88%)",
    description: "Sleek and powerful development machine featuring the Touch Bar and Retina display. Perfect for iOS developers and content creators looking for premium build quality.",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    specifications: {
      processor: "Intel Core i5 (Quad Core, 1.4GHz)",
      ram: "8GB LPDDR3",
      storage: "256GB SSD",
      graphics: "Intel Iris Plus Graphics 645",
      screenSize: '13.3" Retina Display (2560x1600)',
      os: "macOS Sequoia",
    },
  },
  {
    title: "Dell Latitude 7490",
    brand: "Dell",
    price: 19999,
    usageCondition: "1 Year Used (Grade A+ - Showroom condition, no visible scratches)",
    description: "Extremely reliable office laptop with solid performance and carbon fiber casing. Excellent battery backup and comprehensive port connectivity.",
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
    specifications: {
      processor: "Intel Core i7-8650U (up to 4.2GHz)",
      ram: "8GB DDR4 (Expandable)",
      storage: "256GB SSD",
      graphics: "Intel UHD Graphics 620",
      screenSize: '14" FHD (1920x1080) WVA',
      os: "Windows 11 Pro",
    },
  },
  {
    title: "HP EliteBook 840 G5",
    brand: "HP",
    price: 22999,
    usageCondition: "1.5 Years Used (Grade A - Clean aluminum chassis, normal keyboard shine)",
    description: "Premium aluminum business notebook with Bang & Olufsen sound, superb keyboard, and robust security features.",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    specifications: {
      processor: "Intel Core i5-8250U (Quad Core)",
      ram: "16GB DDR4",
      storage: "256GB NVMe SSD",
      graphics: "Intel UHD Graphics 620",
      screenSize: '14" FHD (1920x1080) IPS',
      os: "Windows 10 Pro (Free Win 11 upgrade)",
    },
  },
];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed Database
    await seedDB();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const seedDB = async () => {
  try {
    // Check if products exist
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log("Seeding default laptops...");
      await Product.insertMany(DEFAULT_PRODUCTS);
      console.log("Laptops seeded successfully!");
    }

    // Check if admin user exists
    const adminExists = await User.findOne({ email: "fixmylapquick@gmail.com" });
    if (!adminExists) {
      console.log("Seeding default admin...");
      const hashedPassword = await bcrypt.hash("admin", 10);
      await User.create({
        name: "Shop Admin",
        email: "fixmylapquick@gmail.com",
        mobile: "9822186822",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin seeded successfully!");
    }
  } catch (err) {
    console.error(`Seeding database failed: ${err.message}`);
  }
};

export default connectDB;
