const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/auth.controller')

authRoutes.post("/signin",authController.signin);
authRoutes.post("/signup",authController.signup);
authRoutes.get("/signout",authController.signout);
authRoutes.get("/delete",authController.delete);

module.exports = authRoutes;