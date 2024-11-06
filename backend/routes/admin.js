const { getAllUsers } = require('../repositories/admin');
const express = require('express');

const adminRoute = express.Router();

adminRoute.get('/', getAllUsers);
// adminRoute.put(/)

module.exports = adminRoute;
