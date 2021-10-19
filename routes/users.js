const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../db/models");
const {
  check,
  validationResult,
  asyncHandler,
  csrfProtection,
} = require("./utils");
const { loginUser, requireAuth, restoreUser, logoutUser } = require("../auth");

const router = express.Router();

const userValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The email is already in use by another account."
          );
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password")
    .isLength({ min: 8 })
    .withMessage("Password needs to be at least 8 characters."),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .isLength({ max: 30 })
    .withMessage("Please provide a password under 30 characters."),
];

router.post('/', async(req, res) => {
  const demoUser = await db.User.findByPk(1);
  loginUser(req, res, demoUser)
  res.redirect(`/${demoUser.id}/home`)
});

router.get("/signup", csrfProtection, async (req, res) => {
  const errors = [];
  res.render("signup", { csrfToken: req.csrfToken(), errors });
});

router.post(
  "/signup",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      // user.hashedPassword = hashedPassword;
      const user = db.User.build({ email, username, hashedPassword });
      await user.save();
      loginUser(req, res, user)
      res.redirect(`/${user.id}/home`);
    } else {
      const errors = validatorErrors.array().map((error) => error.message);
      res.render("signup", { csrfToken: req.csrfToken(), errors });
    }
  })
);

router.get("/:id/home", requireAuth, function (req, res, next) {
  res.render('home');
});

router.get("/login", csrfProtection, (req, res) => {
  const errors = [];

  res.render("login", { csrfToken: req.csrfToken(), errors });
});

router.post(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username } });
    const errors = [];

    if (!user) {
      errors.push("Couldn't find the username, would you like to sign up?");
      res.render("signup", { csrfToken: req.csrfToken(), errors });
    }

    const isPassword = await bcrypt.compare(password, user.hashedPassword.toString())

    if (!isPassword) {
      errors.push('Invalid password!');
      res.render('login', { csrfToken: req.csrfToken(), errors });
    } else {
      console.log('sess user', req.session)
      loginUser(req, res, user)
      // req.session.user = { username: user.username, userId: user.id };
      res.redirect(`/${user.id}/home`);
    }
  })
);

module.exports = router;
