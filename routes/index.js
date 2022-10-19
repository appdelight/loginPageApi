const express = require('express');
const router = express.Router();

const signupRoute = require("./signuo.router");
const loginpRoute = require("./login.router");

router.use('/signup', signupRoute);
router.use('/login', loginpRoute);


module.exports = router;

