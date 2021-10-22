const express = require('express');
const router = express.Router();

const  {
    check,
    asyncHandler,
    csrfProtection,
    validationResult,
} = require('./utils');
const { requireAuth } = require('../auth');
const db = require('../db/models');

router.get('/', asyncHandler(async(req, res) => {
    const { projectId } = req.body;
    const tasks = await db.Task.findAll({
        where: {
            projectId
        },
        order: [
            ["createdAt"]
        ],
        attributes: ['name', 'content', 'dueDate', 'language', 'id'],
    })
    res.json({ tasks });
}));

module.exports = router;
