const express = require('express');
const indexRoutes = express.Router();
const indexController = require('../controllers/index.controller')
const AuthorizationMiddleware = require('../controllers/middlewares/authZ')

indexRoutes.get("/",AuthorizationMiddleware,indexController.index);
indexRoutes.get("/signin",indexController.signin);
indexRoutes.get("/signup",indexController.signup);

module.exports = indexRoutes;