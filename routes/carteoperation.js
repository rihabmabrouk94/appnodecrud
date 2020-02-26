const router = require('express').Router();
const CarteoperaioonController = require('./../Controllers/carteoperationController');
const CarteoperaioonControllerInst = new CarteoperaioonController();

router.post('/create', function (req, res, ) {
    CarteoperaioonControllerInst.create(req, res)
});

router.get('/list',function (req,res) {
    CarteoperaioonControllerInst.list(req, res)
});

router.get('/:id', function (req, res) {
    CarteoperaioonControllerInst.get(req, res);
});

router.put('/:id', function (req, res, next) {
    CarteoperaioonControllerInst.update(req, res)
});

router.delete('/:id', function (req, res, next) {
    CarteoperaioonControllerInst.delete(req, res)
});
// router.post('/order/generate', function (req, res, next) {
//     CarteoperaioonControllerInst.generateurOrder(req, res)
// });

module.exports = router;
