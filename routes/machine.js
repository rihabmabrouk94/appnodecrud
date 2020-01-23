const router = require('express').Router();
const  machineController = require('./../Controllers/machineController');

router.post('/create', function (req, res, next) {
    machineController.create(req, res, next)
});
router.get('/list',function (req,res) {
    machineController.list(req, res)
});
router.get('/:id', function (req, res, next) {
    machineController.getById(req, res, next)
});

router.put('/:id', function (req, res, next) {
    machineController.update(req, res, next)
});
router.delete('/:id', function (req, res, next) {
    machineController.delete(req, res, next)
});
module.exports = router;
