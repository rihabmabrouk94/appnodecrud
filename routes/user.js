const router = require('express').Router();
const userController = require('./../Controllers/userController');
const usersessionController = require('./../Controllers/userSessionController');
const models = require("../models/index");
const auth = require("./../middleware/Auth");

const UserControllerInst = new userController();
const usersessionControllerInst = new usersessionController();

router.post('/register', function (req, res, next) {
    UserControllerInst.create(req, res, next)
});

router.post('/login', function (req, res, next) {
    UserControllerInst.login(req, res, next)
});

router.post('/auth', function (req, res, next) {
    usersessionControllerInst.authentificate(req, res)
});
router.put('/logout', function (req, res, next) {
    usersessionControllerInst.logoutSession(req, res)
});

router.get('/list', function (req, res, next) {
    UserControllerInst.list(req, res, next)
});

router.get('/:id', function (req, res, next) {
    UserControllerInst.get(req, res, next)
});
router.get('/:id', function (req, res, next) {
    usersessionControllerInst.get(req, res, next)
});

router.put('/:id', auth, function (req, res, next) {
    UserControllerInst.update(req, res, next)
});

router.delete('/:id', function (req, res, next) {
    UserControllerInst.delete(req, res, next)
});

router.post('/updateMe', auth, function (req, res, next) {
    UserControllerInst.update(req, res, next)
});

module.exports = router;
