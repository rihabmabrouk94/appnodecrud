const router = require('express').Router();
const ClientController = require('./../Controllers/clientController');
const ClientControllerInst = new ClientController();

router.post('/create', function (req, res, next) {
    ClientControllerInst.create(req, res)
});

router.get('/list',function (req,res) {
    ClientControllerInst.list(req, res)
});

router.get('/:id', function (req, res) {
    ClientControllerInst.get(req, res);
});

router.put('/:id', function (req, res, next) {
    ClientControllerInst.update(req, res)
});

router.delete('/:id', function (req, res, next) {
    ClientControllerInst.delete(req, res)
});

module.exports = router;
