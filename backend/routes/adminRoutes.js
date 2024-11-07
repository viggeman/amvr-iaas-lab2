const {
  getAllUsers,
  modifyUser,
  getUserAddress,
} = require('../repositories/adminController');
const express = require('express');

const adminRoute = express.Router();

adminRoute.get('/', getAllUsers);
adminRoute.put('/modify-user', modifyUser);
adminRoute.get('/user-address', getUserAddress);

module.exports = adminRoute;
