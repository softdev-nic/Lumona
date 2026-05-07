require('dotenv').config(); // Load environment variables
const dburl = process.env.DB_URL || "mongodb+srv://softtechoninc:0Ow5AYVvvZsECNuz@lumona.nn7teue.mongodb.net/?appName=Lumona"; // Fallback for development
const mongoose = require('mongoose');
mongoose.connect(dburl, {
  
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;