const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  coverImageURL: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
},
{
   timestamps: true
});

exports.Blog = mongoose.model("blog", blogSchema);
