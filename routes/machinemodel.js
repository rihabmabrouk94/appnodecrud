const router = require('express').Router();
const  machinemodelController = require('./../Controllers/modelController');

router.post('/create', function (req, res, next) {
    machinemodelController.create(req, res, next)
});
router.get('/list',function (req,res) {
    machinemodelController.list(req, res)
});
router.get('/:id', function (req, res, next) {
    machinemodelController.getById(req, res, next)
});

router.put('/:id', function (req, res, next) {
    machinemodelController.update(req, res, next)
});
router.delete('/:id', function (req, res, next) {
    machinemodelController.delete(req, res, next)
});
module.exports = router;
