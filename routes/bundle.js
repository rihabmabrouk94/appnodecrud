const router = require('express').Router();
const BundleController = require('./../Controllers/bundleContoller');
const BundleControllerInst = new BundleController();

router.post('/create', function (req, res, next) {
    BundleControllerInst.create(req, res)
});

router.get('/list',function (req,res) {
    BundleControllerInst.list(req, res)
});

router.get('/:id', function (req, res) {
    BundleControllerInst.get(req, res);
});

router.put('/:id', function (req, res, next) {
    BundleControllerInst.update(req, res)
});

router.delete('/:id', function (req, res, next) {
    BundleControllerInst.delete(req, res)
});

module.exports = router;
