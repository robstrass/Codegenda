const express = require('express');
const { check, validationResult } = require('express-validator');
const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });
const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);


module.exports = {
    csrfProtection,
    asyncHandler,
    check,
    validationResult
}
