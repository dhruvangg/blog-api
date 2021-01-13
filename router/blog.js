const express = require('express'),
    router = express.Router(),
    Blog = require('../controller/blog')

router.get('/', Blog.getPosts);
router.get('/:slug', Blog.getPost);
router.post('/', Blog.createPost);
router.delete('/:id', Blog.removePost);
router.put('/:id', Blog.updatePost);

module.exports = router