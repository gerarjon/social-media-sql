const express = require('express');
const router = express.Router();
const { Posts } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const getAllPosts = await Posts.findAll({order: [['updatedAt', 'DESC']]});
    res.json(getAllPosts);
  } catch(err) {
    throw err
  }
})

router.get('/byId/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
  } catch(err) {
    throw err
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPost = await Posts.destroy({ where: { id: id } })
    console.log(deletedPost)
    res.json(deletedPost)
  } catch(err) {
    throw err
  }
});

router.post('/', async (req, res) => {
  try {
    const post = req.body
    const newPost = await Posts.create(post);
    res.json(newPost)
  } catch(err) {
    throw err
  }
})

module.exports = router;