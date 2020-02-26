const router = require('express').Router();
const OperationController = require('./../Controllers/operationController');
const operationControllerInst = new OperationController();

router.post('/create', function (req, res, ) {
    operationControllerInst.create(req, res)
});

router.get('/list',function (req,res) {
    operationControllerInst.list(req, res)
});

router.get('/operetionsList/:id', function (req, res, next) {
    operationControllerInst.list_operation(req, res)
});

router.get('/get/:id', function (req, res) {
    operationControllerInst.get(req, res);
});

router.get('/startOperation/:usersession_id/:operation_id', function (req, res) {
    operationControllerInst.startOperation(req, res);
});

router.post('/startOperationsession', function (req, res) {
    operationControllerInst.startOperationSession(req, res);
});

router.post('/finishoperation', function (req, res) {
    operationControllerInst.finish_operation(req, res);
});

router.put('/update/:id', function (req, res, next) {
    operationControllerInst.update(req, res)
});

router.delete('/:id', function (req, res, next) {
    operationControllerInst.delete(req, res)
});



module.exports = router;
