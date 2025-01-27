const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    salt: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "author"], default: "user" },
  },
  { timestamps: true }
);

exports.User = mongoose.model("user", userSchema);
