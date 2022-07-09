const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require("bcrypt");

router.post('/signup', async (req, res) => {
  const { name, username, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name: name,
        username: username,
        password: hash,
      })
      res.json("User created")
    }
  );
});

router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({ where: { username: username }});
    if (!user) {
      res.json("User does not exist")
      throw new Error("User does not exist")
    } 
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.json("Wrong Username or Password")
      throw new Error("Wrong Username or Password")
    }
    res.json("Logged in")
  } catch (err) {
    throw err;
  }

})

module.exports = router