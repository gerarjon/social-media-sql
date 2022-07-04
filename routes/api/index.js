const router = require('express').Router();
const postRoutes = require('./posts');
const commentsRoutes = require('./comments');

router.use('/posts', postRoutes);

router.use('/comments', commentsRoutes)

module.exports = router;