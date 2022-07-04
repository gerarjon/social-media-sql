const express = require('express');
const router = express.Router();
const { Posts } = require('../../models');

router.get('/', async (req, res) => {
  const getAllPosts = await Posts.findAll();
  res.json(getAllPosts);
})

router.post('/', async (req, res) => {
  const post = req.body
  await Posts.create(post);
  res.json(post)
})

module.exports = router;