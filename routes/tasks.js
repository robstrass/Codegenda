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
    check('dueDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a due date for your Task'),
    check('language')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a coding lanuage for the task.')
    .isLength({ max: 255 })
    .withMessage('Please limit your coding langauge to less than 255 characters.')
];

router.get(
    "/:projectId(\\d+)",
    asyncHandler(async(req, res) => {
        const errors = [];
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
        res.json({ tasks, errors });
    })
);

router.post(
    "/:projectId(\\d+)",
    taskValidation,
    asyncHandler(async(req, res) => {
        const { name, content, dueDate, language, projectId } = req.body;
        const taskErrors = validationResult(req);

        if (taskErrors.isEmpty()) {
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
        } else {
            let errors = taskErrors.array().map((error) => error.msg);
            res.json({ errors });
        }
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

router.put(
    "/:projectId(\\d+)/:taskId(\\d+)",
    asyncHandler(async(req, res) => {
        // console.log('req body: ', req.body);
        const { projectId, taskId } = req.params;
        const { name, content, language, dueDate } = req.body;
        const task = await db.Task.findByPk(taskId);
        const err = new Error('Task not found!');
        if (task) {
            await task.update({
                name,
                content,
                dueDate,
                language
            });

            res.json({ task });
        } else {
            next(err);
        }
    })
);

// router.put(
//     "/:id(\\d+)",
//     asyncHandler(async(req, res, next) => {
//         // grab id from params, destructure updated project fields from req.body
//         const id = req.params.id;
//         const { name, content, dueDate } = req.body;
//         const project = await db.Project.findByPk(id);
//         const err = new Error("Project not found!");
//         if (project) {
//             await project.update({
//                 name,
//                 content,
//                 dueDate,
//             });

//             res.json({ project });
//         } else {
//             next(err);
//         }
//     })
// );

module.exports = router;
