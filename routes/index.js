const express = require("express");
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    if (req.session.auth) {
        res.redirect(`/users/${req.session.auth.userId}/home`);
        return;
    }
    res.render("splash", { title: "Welcome to CodeGenda you silly programmer!" });
});

router.get(
    "/search/:term",
    asyncHandler(async(req, res) => {
        const { term } = req.params
        const searchedProjects = await db.Project.findAll({
            where: {
                name: {
                    [Op.iLike]: "%" + term + "%",
                },
            },
        });
        res.json({ searchedProjects });
    })
);

module.exports = router;