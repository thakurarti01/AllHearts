const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

// Updated URI with database name `userdb`
const MONGO_URI = 'mongodb+srv://artithakur3105:AllHearts@cluster0.vcnkkfy.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster0';

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

async function seedUsers() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(MONGO_URI);

    // (Optional) Remove previous users
    await User.deleteMany();

    const users = [];

    // Generate 5000 fake users
    for (let i = 0; i < 5000; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      });
    }

    // Insert into the collection
    await User.insertMany(users);
    console.log('5000 users inserted successfully!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB connection closed.');
  }
}

seedUsers();
