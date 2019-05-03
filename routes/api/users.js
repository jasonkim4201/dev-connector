const express = require("express");
const router = express.Router();

// @route GET api/ users
// description: test route
// access value: public
router.get("/", (req, res) => res.send("user route"));

module.exports = router;