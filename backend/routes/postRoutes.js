const express = require('express');
const {
  getAllPosts,
  getAllPostsWithComments,
  getPostById,
  getPostsByUser,
  deletePost,
} = require('../repositories/postController');
const routes = express.Router();

routes.get('/posts', getAllPosts);
routes.get('/posts-w-comments', getAllPostsWithComments);
routes.get('/posts/:postId', getPostById);
routes.get('/users/:userId/posts', getPostsByUser);
routes.delete('/posts/:postId', deletePost);

module.exports = routes;
