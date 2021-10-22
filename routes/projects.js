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
    asyncHandler(async(req, res) => {
        const { username } = req.body;
        const projects = await db.Project.findAll({
            where: {
                userId: req.session.auth.userId,
            },
            order: [
                ["createdAt"]
            ],
            attributes: ["name", "content", "dueDate", "id"],
        });
        res.json({ projects });
    })
);

router.post(
    "/",
    projectValidation,
    asyncHandler(async(req, res) => {
        const { name, content, dueDate } = req.body;
        const newProject = await db.Project.build({ name, content, dueDate });
        const userId = req.session.auth.userId;
        newProject.userId = userId;
        const saved = await newProject.save();
        // console.log('test', newProject);
        res.json(newProject);
    })
);

router.get('/:id(\\d+)',
    requireAuth,
    asyncHandler(async(req, res) => {
        const id = req.params.id;
        const project = await db.Project.findByPk(id, {
            include: db.User
        });
        if(!project) {
            const err = new Error("What are you doing here? This project doesn't exist anyways.");
            err.status = 400;
            throw err;
        }
        if(res.locals.user.id !== project.User.id) {
            const err = new Error("You don't belong here.");
            err.status = 401;
            throw err;
        }
        res.json({ project });
    }));


router.put('/:id(\\d+)',
    projectValidation,
    asyncHandler(async(req, res, next) => {
        // grab id from params, destructure updated project fields from req.body
        const id = req.params.id;
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

router.delete('/:id(\\d+)', asyncHandler(async(req, res) => {
    const id = req.params.id;
    const project = await db.Project.findByPk(id)
    await project.destroy();
}))

module.exports = router;
