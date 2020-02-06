const router = require('express').Router();
const OperationController = require('./../Controllers/operationController');
const OperationControllerInst = new OperationController();

router.post('/create', function (req, res, ) {
    OperationControllerInst.create(req, res)
});

router.get('/list',function (req,res) {
    OperationControllerInst.list(req, res)
});

router.get('/:id', function (req, res) {
    OperationControllerInst.get(req, res);
});

router.put('/:id', function (req, res, next) {
    OperationControllerInst.update(req, res)
});

router.delete('/:id', function (req, res, next) {
    OperationControllerInst.delete(req, res)
});

module.exports = router;
