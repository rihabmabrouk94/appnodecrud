const router = require('express').Router();
const  userController = require('./../Controllers/userController');
const models = require("../models/index");
const auth = require("./../middleware/Auth");
const userModel = models['Users'];
const validate = require("../helpers/validate");

router.post('/register', function (req, res, next) {
    userController.register(req, res, next)
});

router.post('/login', function (req, res, next) {
    userController.login(req, res, next)
});

router.get('/list', function (req, res, next) {
    userController.list(req, res, next)
});

router.get('/:id', function (req, res, next) {
    userController.getById(req, res, next)
});

router.put('/:id', auth, function (req, res, next) {
    userController.update(req, res, next)
});

router.delete('/:id', function (req, res, next) {
    userController.delete(req, res, next)
});

router.post('/updateMe', auth, function (req, res, next) {
    userController.updateMe(req, res, next)
});

module.exports = router;
