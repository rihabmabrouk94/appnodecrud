const router = require('express').Router();
//const userController = require('./../Controllers/userController');
const usersessionController = require('./../Controllers/userSessionController');
const models = require("../models/index");


//const UserControllerInst = new userController();
const usersessionControllerInst = new usersessionController();

router.get('/listsession/:id', function (req, res, next) {
    usersessionControllerInst.get(req, res, next)
});
router.get('/list', function (req, res, next) {
    usersessionControllerInst.list(req, res, next)
});
router.put('/logout', function (req, res, next) {
    usersessionControllerInst.logoutSession(req, res)
});

module.exports = router;
