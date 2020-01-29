const router = require('express').Router();
const  MachineController = require('./../Controllers/machineController');
const MachineControllerInst = new MachineController();

router.post('/create', function (req, res, next) {
    MachineControllerInst.create(req, res, next)
});

router.get('/list',function (req,res) {
    MachineControllerInst.list(req, res)
});

router.get('/:id', function (req, res, next) {
    MachineControllerInst.getById(req, res, next)
});

router.put('/:id', function (req, res, next) {
    MachineControllerInst.update(req, res, next)
});

router.delete('/:id', function (req, res, next) {
    MachineControllerInst.delete(req, res, next)
});

module.exports = router;
