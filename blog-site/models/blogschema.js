const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const blogSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  published_date: {
    type: String,
    default: new Date(Date.now())
  },
  special_title: {
    type: String,
  },  
  special_description: {
    type: String,
  },
  comments : [
    {
      type : mongoose.Types.ObjectId,
      ref : "Comment"
    }
  ]
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;