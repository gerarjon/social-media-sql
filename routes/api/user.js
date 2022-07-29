const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../../middleware/is-auth') 

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
      res.json({error:"User does not exist"})
      throw new Error("User does not exist")
    } 
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.json({error:"Wrong Username or Password"})
      throw new Error("Wrong Username or Password")
    }
    const token = sign(
      { username: user.username, id: user.id, name: user.name }, 
      'somesupersecretkey',
    )
    res.json({token: token, username: user.username, name: user.name, UserId: user.id})
  } catch (err) {
    console.log(err)
  }
})

router.get('/', validateToken, (req, res) => {
  res.json(req.user)
})

module.exports = router