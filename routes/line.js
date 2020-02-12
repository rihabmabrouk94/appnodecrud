const router = require('express').Router();
const LineController = require('./../Controllers/lineController');
const LineControllerInst = new LineController();

router.post('/create', function (req, res, next) {
    LineControllerInst.create(req, res, next)
});

router.get('/list',function (req,res) {
    LineControllerInst.list(req, res)
});

router.get('/listbox/:id',function (req,res) {
    LineControllerInst.getBoxByLine(req, res)
});

router.get('/:id', function (req, res, next) {
    LineControllerInst.get(req, res, next)
});

router.put('/:id', function (req, res, next) {
    LineControllerInst.update(req, res, next)
});

router.delete('/:id', function (req, res, next) {
    LineControllerInst.delete(req, res, next)
});

module.exports = router;
