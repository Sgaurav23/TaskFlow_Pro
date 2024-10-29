const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User } = require('./schema'); // Adjust the path to your schema

dotenv.config();

const clearUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    await User.deleteMany({}); // Delete all users
    console.log('All users deleted');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error clearing users:', err.message);
    mongoose.connection.close();
  }
};

clearUsers();





