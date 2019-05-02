const mongoose = require("mongoose"); 
const config = require("config");
// to get the stuff from default.json the global variable
const db = config.get("mongoURI");

// ASYNC AWAIT TIME 
const connectDB = async () => {
  try {
    await mongoose.connect(db, {useNewUrlParser: true});
    console.log("MongoDB connected!");
  } catch (error) {
    console.error(error.message);
    // exit process with failure
    process.exit(1);
  }
}

module.exports = connectDB;