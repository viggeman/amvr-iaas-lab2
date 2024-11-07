const {
  getAllUsers,
  modifyUser,
  getUserAddress,
} = require('../repositories/adminController');
const express = require('express');

const routes = express.Router();

routes.get('/', getAllUsers);
routes.put('/modify-user', modifyUser);
routes.get('/user-address', getUserAddress);

module.exports = routes;
