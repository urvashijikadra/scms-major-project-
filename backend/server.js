const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ROUTES
const studentRoutes = require('./routes/student.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/students', studentRoutes);
app.use('/auth', authRoutes);

// DB - Using MongoDB with Mongoose
const connectDB = require('./config/db');
const User = require('./models/user.model');
const Student = require('./models/student.model');

// Connect to MongoDB and start server
connectDB()
  .then(async () => {
    console.log("Database connected");
    
    // Seed initial users if none exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const hashedAdmin = await bcrypt.hash('admin123', 10);
      const hashedUser = await bcrypt.hash('user123', 10);
      
      await User.insertMany([
        { email: 'admin@scms.com', password: hashedAdmin, name: 'Admin User', role: 'admin' },
        { email: 'user@scms.com', password: hashedUser, name: 'Regular User', role: 'user' }
      ]);
      console.log('✅ Demo users created!');
      console.log('Admin: admin@scms.com / admin123');
      console.log('User: user@scms.com / user123');
    }
    
    app.listen(5000, () => console.log("Server running on 5000"));
  })
  .catch(err => console.error("Database connection error:", err));
