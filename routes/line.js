const router = require('express').Router();
const  lineController = require('./../Controllers/lineController');

router.post('/createline', function (req, res, next) {
    lineController.createline(req, res, next)
});
router.get('/listline',function (req,res) {
    lineController.listoflines(req, res)
});
router.get('/:id', function (req, res, next) {
    lineController.getlineById(req, res, next)
});

router.put('/:id', function (req, res, next) {
    lineController.updateline(req, res, next)
});
router.delete('/:id', function (req, res, next) {
    lineController.deleteline(req, res, next)
});
module.exports = router;
