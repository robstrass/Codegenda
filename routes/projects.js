const express = require("express");
const router = express.Router();
const {
  check,
  asyncHandler,
  csrfProtection,
  validationResult,
} = require("./utils");

const db = require("../db/models");

const projectValidation = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please name your project.")
    .isLength({ max: 255 })
    .withMessage("Please make the project name less than 255 characters."),
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Please provide content."),
];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log("we are in projects");
    const { username } = req.body;
    const projects = await db.Project.findAll({
      where: {
        userId: req.session.auth.userId,
      },
      order: [["createdAt"]],
      attributes: ["name", "content", "dueDate", "id"],
    });
    res.json({ projects });
  })
);

router.post(
  "/",
  projectValidation,
  asyncHandler(async (req, res) => {
    const { name, content, dueDate } = req.body;
    const newProject = await db.Project.build({ name, content, dueDate });
    const userId = req.session.auth.userId;
    newProject.userId = userId;
    await newProject.save();
  })
);

router.put('/:id(\\d+)',
  projectValidation,
  asyncHandler(async (req, res, next) => {
    // grab id from params, destructure updated project fields from req.body
    const { id } = req.params.id;
    const { name, content, dueDate } = req.body
    const project = await db.Project.findByPk(id);
    const err = new Error('Project not found!');
    if (project) {
      await project.update({
        name,
        content,
        dueDate
      })

      res.json({ project });
    } else {
      next(err);
    }
  }));

module.exports = router;
