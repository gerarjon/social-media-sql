const router = require('express').Router();
const postRoutes = require('./posts');
const commentsRoutes = require('./comments');
const userRoutes = require('./user')
const likesRouters = require('./likes');

router.use('/posts', postRoutes);

router.use('/comments', commentsRoutes)

router.use('/user', userRoutes)

router.use('/like', likesRouters)

module.exports = router;