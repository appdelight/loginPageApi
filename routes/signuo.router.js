const express = require('express');
const router = express.Router();
const signupController = require('../controller/user.controller');

router.post('/', signupController.createUser);

module.exports =  router;

