const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route POST api/posts
// description: create a post
// access value: private

router.post("/", [auth, [
  check("text", "Text is required").not().isEmpty()
]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password"); // to not bring pw back. because thats baaaaad

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();
    res.json(post);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }

});

// @route GET api/posts
// description: Get all posts
// access value: private

router.get("/", auth, async (req, res) => {

  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/posts/:id
// description: Get posts by id
// access value: private

router.get("/:id", auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    //  also make sure to check to see if there is a post with that id
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);

  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/posts/:id
// description: delete a post
// access value: private

router.delete("/:id", auth, async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // check that user is in face the actual user deleting the post and some someone completely different. cause that would be bad
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User is not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });

  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});


module.exports = router;