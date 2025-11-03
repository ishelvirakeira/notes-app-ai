const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb+srv://ishelvirakeira_db_user:QjtwX7dDGqX9Ivk9@cluster0.vnt1rh6.mongodb.net/notesDB");
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectMongo;