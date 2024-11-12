const {
  getAllUsers,
  getUser,
  modifyUser,
  getUserAddress,
  deleteUser,
} = require('../repositories/adminController');
const express = require('express');

const routes = express.Router();

routes.get('/', getAllUsers);
routes.get('/get-user/:id', getUser);
routes.put('/modify-user/:id', modifyUser);
routes.get('/get-user-address/:id', getUserAddress);
routes.delete('/delete-user/:id', deleteUser);

module.exports = routes;
