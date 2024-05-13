import mongoose from "mongoose";


const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Database connection successful");
})
.catch((error) => {
  console.error("Database connection error:", error);
  process.exit(1); 
});

