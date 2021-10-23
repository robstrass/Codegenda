const express = require("express");
const router = express.Router();

const {
    check,
    asyncHandler,
    csrfProtection,
    validationResult,
} = require("./utils");
const { requireAuth } = require("../auth");
const db = require("../db/models");

const taskValidation = [
    check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please give your task a name.")
    .isLength({ max: 255 })
    .withMessage("The max characters for your task name is 255."),
    check("content")
    .exists({ checkFalsy: true })
    .withMessage("Please describe your task."),
];

router.get(
    "/:projectId(\\d+)",
    asyncHandler(async(req, res) => {
        const { projectId } = req.params;
        const tasks = await db.Task.findAll({
            where: {
                projectId,
            },
            order: [
                ["createdAt"]
            ],
            attributes: ["name", "content", "dueDate", "language", "id"],
        });
        res.json({ tasks });
    })
);

router.post(
    "/:projectId(\\d+)",
    asyncHandler(async(req, res) => {
        const { name, content, dueDate, language, projectId } = req.body;
        const newTask = await db.Task.build({
            name,
            content,
            dueDate,
            language,
            projectId,
        });
        const userId = req.session.auth.userId;
        newTask.userId = userId;
        await newTask.save();
        res.json(newTask);
    })
);
router.delete(
    "/:projectId(\\d+)/:taskId(\\d+)",
    asyncHandler(async(req, res) => {
        const id = req.params.taskId;
        const task = await db.Task.findByPk(id);
        await task.destroy();
        res.send('Deleted')
    })
);
module.exports = router;
