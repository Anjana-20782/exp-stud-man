// // config/db.js
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/studentdb';

// export default async function connectDB() {
//   try {
//     await mongoose.connect(MONGODB_URI, {
//       // mongoose 7 removed some options; keep minimal
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1); // exit on DB error
//   }
// }


import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const MONGODB_URI=process.env.MONGODB_URI || "mongodb://localhost:27017/studentdb";

const connectDB=async()=>{
  try {
    await mongoose.connect(MONGODB_URI,{
});
console.log("mongodb connected");

  } catch (error) {
    console.log("mongodb connection error");
    process.exit(1)
    
  }
}

export default connectDB