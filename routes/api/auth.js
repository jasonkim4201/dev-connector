const express = require("express");
const router = express.Router();

// @route GET api/auth
// description: test route
// access value: public

router.get("/", (req, res) => res.send("auth route"));

module.exports = router;