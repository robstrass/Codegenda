const express = require('express');
const bcrypt = require("bcryptjs");

const db = require("../db/models");
const { check, validationResult, asyncHandler, csrfProtection } = require("./utils");
const { loginUser, requireAuth, restoreUser, logoutUser } = require("../auth");

const router = express.Router();

router.get('/home', requireAuth, function(req, res, next) {
  if(requireAuth) {
    res.render('home')
  } else {
    console.log('bye')
    res.redirect('/login');
  }
});


module.exports = router;
