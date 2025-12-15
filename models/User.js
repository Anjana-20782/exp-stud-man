import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true } // hashed
// }, { timestamps: true });
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // OPTIONAL
  profileImage: { type: String } // base64 string
}, { timestamps: true });


export default mongoose.model('User', UserSchema);
