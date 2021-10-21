const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if(req.session.auth) {
    res.redirect(`/users/${req.session.auth.userId}/home`)
    return;
  }
  res.render("index", { title: "Welcome to CodeGenda you silly programmer!" });
});

module.exports = router;
