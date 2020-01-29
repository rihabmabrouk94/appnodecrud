const router = require('express').Router();
const BoxController = require('./../Controllers/boxController');
const BoxControllerInst = new BoxController();

router.post('/create', function (req, res, next) {
    BoxControllerInst.create(req, res)
});

router.get('/list',function (req,res) {
    BoxControllerInst.list(req, res)
});

router.get('/:id', function (req, res) {
    BoxControllerInst.get(req, res);
});

router.put('/:id', function (req, res, next) {
    BoxControllerInst.update(req, res)
});

router.delete('/:id', function (req, res, next) {
    BoxControllerInst.delete(req, res)
});

module.exports = router;
