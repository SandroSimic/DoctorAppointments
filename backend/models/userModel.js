import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "User with that username already exists"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "User with that email already exists"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Minimum length for password is 6 letters"],
  },
  role: {
    type: String,
    enum: ["doctor", "patient"],
    default: "patient",
  },
});

// Methods to compare the enteredPassword to the encrypted one
userSchema.methods.matchPassword = async function (enteredPassword) {
  // If password is undefined
  if (!this.password) {
    return false;
  }

  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt the password before pre save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
