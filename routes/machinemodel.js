const router = require('express').Router();
const MachineModelsController = require('./../Controllers/modelController');
const machinemodelControllerInst = new MachineModelsController();

router.post('/create', function (req, res, next) {
    machinemodelControllerInst.create(req, res, next)
});

router.get('/list', function (req, res) {
    machinemodelControllerInst.list(req, res)
});

router.get('/:id', function (req, res, next) {
    machinemodelControllerInst.get(req, res, next)
});

router.put('/:id', function (req, res, next) {
    machinemodelControllerInst.update(req, res, next)
});

router.delete('/:id', function (req, res, next) {
    machinemodelControllerInst.delete(req, res, next)
});

module.exports = router;
