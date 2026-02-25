const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function seed() {
  await mongoose.connect('mongodb://127.0.0.1:27017/scms');
  
  // Clear existing users
  await User.deleteMany({});
  
  // Create admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  await User.create({
    email: 'admin@scms.com',
    password: adminPassword,
    name: 'Admin User',
    role: 'admin'
  });
  
  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  await User.create({
    email: 'user@scms.com',
    password: userPassword,
    name: 'Regular User',
    role: 'user'
  });
  
  console.log('✅ Demo users created successfully!');
  console.log('Admin: admin@scms.com / admin123');
  console.log('User: user@scms.com / user123');
  
  await mongoose.disconnect();
}

seed().catch(console.error);
