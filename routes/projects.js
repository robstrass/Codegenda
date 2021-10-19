const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");

const db = require("../db/models");

router.get(
  "/api/projects",
  asyncHandler(async (req, res) => {
    const { username } = req.body;
    const projects = await db.Project.findAll({
      include: [{ model: User, as: "user", attributes: ["username"] }],
      order: [["createdAt"]],
      attributes: ["name"],
    });
    res.json({ projects });
  })
);
router.post("/api/projects", (req, res) => {});

module.exports = router;
