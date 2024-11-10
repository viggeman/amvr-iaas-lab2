const { getAllAuth, checkAuth } = require('../repositories/authController')

const express = require('express');

const routes = express.Router();

// Define the GET route if needed
//routes.get('/', getAllAuth);


// Define the POST route for authentication
routes.post('/', checkAuth);


module.exports = routes;
