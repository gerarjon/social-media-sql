const express = require('express');
const router = express.Router();
const { User, Posts, Comments, Likes } = require('../../models');
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../../middleware/is-auth'); 

router.post('/signup', async (req, res) => {
  const { name, username, password } = req.body;
  const user = await User.findOne({ where: { username: username }});
  if (user) {
    return res.json({error:"User already exists"})
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name: name,
        username: username,
        password: hash,
        profileUrl: "",
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
      { username: user.username, id: user.id, name: user.name, profileUrl: user.profileUrl }, 
      'somesupersecretkey',
    )
    res.json({
      token: token, 
      username: user.username, 
      name: user.name, 
      UserId: user.id, 
      profileUrl: user.profileUrl
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/', validateToken, (req, res) => {
  res.json(req.user)
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id,
      {
        attributes: {exclude: ['password']}
      }
    );
    res.json(user)
  } catch (err) {
    throw err
  }
})

router.get('/:id/posts', async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Posts.findAll({
      where: {
        UserId: id
      },
      include: [
        Likes, Comments
      ]
    })
    res.json(posts)
  } catch (err) {
    throw err
  }
})

router.get('/:id/comments', async (req, res) => {
  try {
    const id = req.params.id;
    const comments = await Comments.findAll({
      where: {
        UserId: id
      }
    })
    res.json(comments)
  } catch (err) {
    throw err
  }
})



module.exports = router