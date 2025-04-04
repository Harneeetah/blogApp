import express from "express";
import path from "path";
import ejs from "ejs";
import morgan from "morgan";
import _ from "lodash";
import dotenv from "dotenv";
import Post from "./model/blogModel.js";
import connectDB from "./db/connectdb.js";
dotenv.config({});

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const composeContent = "Fill the dialog boxes below to compose a post.";
const app = express();
app.locals._ = _;
const __dirname = path.resolve();
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 4002;
const MONGOURL = process.env.MONGO_URL;

app.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("home", { homeStartingContent: homeStartingContent, posts: posts });
  });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose", { composeContent: composeContent });
});

app.post("/compose", async (req, res) => {
  //{postTitle: req.body.postTitle, postBody: req.body.postBody}
  const post = await Post.create({
    post: req.body.postBody,
    title: req.body.postTitle,
  });
  if (post) {
    res.redirect("/");
  }
  console.log("reached post");
});

app.get("/posts/:postId", (req, res) => {
  const requestedId = _.toString(req.params.postId);
  Post.findOne({ _id: requestedId }, (err, post) => {
    res.render("post", { postTitle: post.postTitle, postBody: post.postBody });
  });
});

app.listen(process.env.PORT || 4002, function () {
  console.log("Server started on port 4002");
});
