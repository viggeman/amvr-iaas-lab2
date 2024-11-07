const { getAllAuth } = require('../repositories/authController')

const express = require('express');

const routes = express.Router();

routes.get('/', getAllAuth);


module.exports = routes;
