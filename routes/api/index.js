const router = require('express').Router();
const postRoutes = require('./posts');
const commentsRoutes = require('./comments');
const userRoutes = require('./user')

router.use('/posts', postRoutes);

router.use('/comments', commentsRoutes)

router.use('/user', userRoutes)

module.exports = router;