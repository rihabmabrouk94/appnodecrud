const router = require('express').Router();
const  workController = require('./../Controllers/workController');
const workControllerInst = new workController();

router.post('/create', function (req, res, next) {
    workControllerInst.create(req, res, next)
});

router.get('/list',function (req,res) {
    workControllerInst.list(req, res)
});

router.get('/:id', function (req, res, next) {
    workControllerInst.get(req, res, next)
});

router.put('/:id', function (req, res, next) {
    workControllerInst.update(req, res, next)
});

router.delete('/:id', function (req, res, next) {
    workControllerInst.delete(req, res, next)
});

module.exports = router;
