const express = require('express');
const getProfile = require('../repositories/profile');

const profileRoutes = express.Router();

profileRoutes.get('/profile', getProfile);

module.exports = profileRoutes;
