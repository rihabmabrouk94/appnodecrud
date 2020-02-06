const router = require('express').Router();
const OperationtemplateController = require('./../Controllers/operationtemplateController');
const OperationtemplateControllerInst = new OperationtemplateController();

router.post('/create', function (req, res, ) {
    OperationControllerInst.create(req, res)
});

router.get('/list',function (req,res) {
    OperationtemplateControllerInst.list(req, res)
});

router.get('/:id', function (req, res) {
    OperationtemplateControllerInst.get(req, res);
});

router.put('/:id', function (req, res, next) {
    OperationtemplateControllerInst.update(req, res)
});

router.delete('/:id', function (req, res, next) {
    OperationtemplateControllerInst.delete(req, res)
});
router.post('/order/generate', function (req, res, next) {
    OperationtemplateControllerInst.generateurOrder(req, res)
});

module.exports = router;
