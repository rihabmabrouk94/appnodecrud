const router = require('express').Router();
const  machinetypeofController = require('./../Controllers/machinetypeController');

router.post('/create', function (req, res, next) {
    machinetypeofController.create(req, res, next)
});
router.get('/list',function (req,res) {
    machinetypeofController.list(req, res)
});
router.get('/:id', function (req, res, next) {
    machinetypeofController.getById(req, res, next)
});

router.put('/:id', function (req, res, next) {
    machinetypeofController.update(req, res, next)
});
router.delete('/:id', function (req, res, next) {
    machinetypeofController.delete(req, res, next)
});
module.exports = router;
