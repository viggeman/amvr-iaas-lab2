const { getAllUsers, modifyUser } = require('../repositories/adminController');
const express = require('express');

const adminRoute = express.Router();

adminRoute.get('/', getAllUsers);
adminRoute.put('/modify-user', modifyUser);

module.exports = adminRoute;
