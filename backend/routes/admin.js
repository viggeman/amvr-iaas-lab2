const { getAllUsers, modifyUser } = require('../repositories/admin');
const express = require('express');

const adminRoute = express.Router();

adminRoute.get('/', getAllUsers);
adminRoute.post('/modify-user', modifyUser);

module.exports = adminRoute;
