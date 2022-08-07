const express = require('express');
const { validateToken } = require('../../middleware/is-auth');
const router = express.Router();
const { Posts, Likes, Comments } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const getAllPosts = await Posts.findAll(
      {
        order: [['updatedAt', 'DESC']],
        include: [
          Likes,
          Comments
        ]
      }
    );
    res.json(getAllPosts);
  } catch(err) {
    throw err
  }
})

router.get('/byId/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findByPk(id, {
      include: [
        Likes, 
        Comments
      ]
    });
    res.json(post);
  } catch(err) {
    throw err
  }
})

router.put('/update/:id', validateToken, async (req, res) => {
  try {
    const post = req.body
    const id = req.params.id;
    const updatedPost = await Posts.update(
      {
        title: post.title,
        body: post.body
      },
      {
        where: {
          id: id
        }
      }
    )
    res.json(updatedPost)
  } catch (err) {
    throw err
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteComments = await Comments.destroy({ where: {PostId : id}})
    const deletedPost = await Posts.destroy({ where: { id: id } })
    console.log(deletedPost, deleteComments)
    res.json(deletedPost)
  } catch(err) {
    throw err
  }
});

router.post('/', validateToken, async (req, res) => {
  try {
    const post = req.body;
    post.UserId = req.user.id;
    post.profileUrl = req.user.profileUrl;
    console.log(post)
    const newPost = await Posts.create(post);
    res.json(newPost)
  } catch(err) {
    throw err
  }
})

module.exports = router;