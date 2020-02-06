const router = require('express').Router();
const OrderController = require('./../Controllers/orderController');
const OrderControllerInst = new OrderController();

router.post('/create', function (req, res, next) {
    OrderControllerInst.create(req, res)
});

router.get('/list',function (req,res) {
    OrderControllerInst.list(req, res)
});

router.get('/:id', function (req, res) {
    OrderControllerInst.get(req, res);
});

router.put('/:id', function (req, res, next) {
    OrderControllerInst.update(req, res)
});

router.delete('/:id', function (req, res, next) {
    OrderControllerInst.delete(req, res)
});

module.exports = router;
