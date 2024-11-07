const {
  getAllUsers,
  modifyUser,
  getUserAddress,
  deleteUser,
} = require('../repositories/adminController');
const express = require('express');

const routes = express.Router();

routes.get('/', getAllUsers);
routes.put('/modify-user', modifyUser);
routes.get('/user-address', getUserAddress);
routes.delete('/delete-user', deleteUser);

module.exports = routes;
