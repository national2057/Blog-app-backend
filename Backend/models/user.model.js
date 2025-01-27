const mongoose = require("mongoose");
const { Schema } = mongoose;
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/authentication");

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

// // middleware for register
// userSchema.pre("save", function (next) {
//   const user = this; // "this" indicates current user

//   if (!user.isModified("password")) return;

//   const salt = randomBytes(16).toString();
//   const hashedPassword = createHmac("sha256", salt)
//     .update(user.password)
//     .digest("hex");

//   this.salt = salt;
//   this.password = hashedPassword;

//   next();
// });

// // middleware for login
// userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
//   const user = await this.findOne({ email });
//   if (!user) throw new Error("User not Found!!");

//   const salt = user.salt;
//   const hashedPassword = user.password;

//   const providedPassword = createHmac("sha256", salt)
//     .update(password)
//     .digest("hex");

//   if (hashedPassword !== providedPassword)
//     throw new Error("Incorrect Password!!");

//    const token = createTokenForUser(user);
//      return token;
// });

exports.User = mongoose.model("user", userSchema);
