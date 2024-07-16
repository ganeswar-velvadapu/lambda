const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blogschema");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Comment = require("./models/commentSchema");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/Blog");
}

main()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

//Home Route(Show all blogs)
app.get("/", async (req, res, next) => {
  try {
    let blogData = await Blog.find({});
    res.render("./blogs/allblogs", { blogData });
  } catch (err) {
    next(err);
  }
});
//create new blog
app.get("/new", (req, res) => {
  res.render("./blogs/newblog");
});
app.post("/", async (req, res, next) => {
  try {
    let { title, description, author, special_title, special_description } =
      req.body;
    let newBlog = Blog({
      title,
      description,
      author,
      special_title,
      special_description,
    });
    await newBlog.save();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

// Delete Blog
app.delete("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

//Edit and Update Blog
app.post("/:id/editblog", async (req, res, next) => {
  try {
    let { id } = req.params;
    let singledata = await Blog.findById(id);
    res.render("./blogs/editblog", { singledata });
  } catch (err) {
    next(err);
  }
});
app.put("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let { title, description, author } = req.body;
    await Blog.findByIdAndUpdate(id, { title, description, author });
    console.log("Data Updated");
    res.redirect(`/${id}`);
  } catch (err) {
    next(err);
  }
});
// Show Induvidual Blog
app.get("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let singledata = await Blog.findById(id).populate("comments");
    res.render("./blogs/eachblog", { singledata });
  } catch (err) {
    next(err);
  }
});

//Comment Route
app.post("/:id/comment", async (req, res, next) => {
  try {
    const { id } = req.params;
    let blog = await Blog.findById(id);
    let { comment } = req.body;
    let newComment = new Comment({
      comment: comment,
    });
    blog.comments.push(newComment);
    await newComment.save();
    await blog.save();
    res.redirect(`/${id}`);
  } catch (error) {
    next(error);
  }
});

//Delete comment route
app.delete("/:id/comment/:commentId", async (req, res,next) => {
  try {
    let { id, commentId } = req.params;
    await Blog.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Blog.findByIdAndDelete(commentId);
  
    res.redirect(`/${id}`);
  } catch (error) {
    next(error)
  }
});

app.use((err, req, res, next) => {
  res.send("Something went wrong");
});
