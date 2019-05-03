const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");


// @route POST api/users
// description: register user
// access value: public
router.post("/", [
  check("name", "Name is required")
    .not()
    .isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter in a password with 6 or more characters").isLength({ min: 6 })
],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });

      if (user) {
       return res.status(400).json({ errors: [{ msg: "User already exists"}] });
      }
      // get users gravatar
      const avatar = gravatar.url(email, {
        // s is size r is rating d is default
        s: "200",
        r: "pg",
        d: "mm"
      })

      user = new User ({
        name,
        email,
        avatar,
        password
      });
      // encrypt password with bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // return json webtoken
      res.send("user registered");

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }

  }
);

module.exports = router;