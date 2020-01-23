const router = require('express').Router();
const  userController = require('./../Controllers/userController');


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
router.put('/:id', function (req, res, next) {
    userController.update(req, res, next)
});
router.delete('/:id', function (req, res, next) {
    userController.delete(req, res, next)
});
module.exports = router;
