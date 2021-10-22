const express = require("express");
const router = express.Router();
const { requireAuth } = require("../auth");
const db = require("../db/models");

router.get(
  "/users/:id(\\d+)/search/projects",
  requireAuth,
  async (req, res) => {
    const { userId } = req.session.requireAuth;
    const user = await db.User.findByPk(userId);
    console.log("user", user);
    res.render("search");
  }
);

module.exports = router;
