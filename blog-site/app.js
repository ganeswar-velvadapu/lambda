const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blogschema");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Comment = require("./models/commentSchema");
const User = require("./models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());

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


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.cookies.token ? true : false;
  next();
});

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
app.get("/new",checkToken, (req, res) => {
  res.render("./blogs/newblog");
});
app.post("/", checkToken, async (req, res, next) => {
  try {
    let { title, description, author,special_title, special_description } =
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
app.delete("/:id", checkToken, async (req, res, next) => {
  try {
    let { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

//Edit and Update Blog
app.post("/:id/editblog", checkToken, async (req, res, next) => {
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
//Auth routes
app.get("/signup", (req, res) => {
  try {
    res.render("./blogs/signup");
  } catch (error) {
    console.log(error);
  }
});
app.get("/login", (req, res) => {
  try {
    res.render("./blogs/login");
  } catch (error) {
    console.log(error);
  }
});

app.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.send("User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    const payload = {
      id: newUser.id,
      email: newUser.email,
    };
    const token = generateToken(payload);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const passcode = await bcrypt.compare(password, user.password);
      if (passcode) {
        const payload = {
          id: user.id,
          email: user.email,
        };
        const token = generateToken(payload);
        res.cookie("token", token, { httpOnly: true });
        return res.redirect("/");
      } else {
        return res.send("Password is wrong");
      }
    }
    res.send("User does not exist");
  } catch (error) {
    console.log(error)
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
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
app.post("/:id/comment", checkToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    let blog = await Blog.findById(id);
    let { comment} = req.body;
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

// Delete comment route
app.delete("/:id/comment/:commentId", checkToken, async (req, res, next) => {
  try {
    let { id, commentId } = req.params;
    await Blog.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);  // Corrected this line to use Comment model

    res.redirect(`/${id}`);
  } catch (error) {
    next(error);
  }
});


function generateToken(userData) {
  const token = jwt.sign(userData, "ganesh12345");
  return token;
}

function checkToken(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.redirect("/login");
    }
    const decode = jwt.verify(token, "ganesh12345");
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
}



app.use((err, req, res, next) => {
  res.send("Something went wrong");
});
