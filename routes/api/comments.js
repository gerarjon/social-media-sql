const express = require('express');
const router = express.Router();
const { Comments } = require('../../models');
const { validateToken } = require('../../middleware/is-auth')

router.get('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Comments.findAll({where: {PostId: postId}})
    res.json(post)
  } catch (err) {
    console.log(err)
  }
})

router.post('/', validateToken, async (req, res) => {
  try {
    const comment = req.body;
    comment.username = req.user.username;
    comment.UserId = req.user.id;
    console.log(req.user)
    const result = await Comments.create(comment);
    res.json(result)
  } catch (err) {
    throw err
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedComment = await Comments.destroy({where: {id: id}});
    res.json(deletedComment)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;