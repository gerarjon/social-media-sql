const express = require('express');
const router = express.Router();
const { Comments } = require('../../models');

router.get('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Comments.findAll({where: {PostId: postId}})
    res.json(post)
  } catch (err) {
    throw err
  }
})

router.post('/', async (req, res) => {
  try {
    const comment = req.body;
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
    throw err
  }
})

module.exports = router;