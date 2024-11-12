const express = require('express');
const { createUser } = require('../repositories/registerController');

const routes = express.Router();

// Define the POST route for registration
routes.post('/register', createUser);

module.exports = routes;
