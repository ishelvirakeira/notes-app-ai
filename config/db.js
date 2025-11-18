const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectMongo;