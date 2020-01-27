const router = require('express').Router();
const  roleController = require('./../Controllers/roleController');

router.post('/create', function (req, res, next) {
    roleController.create(req, res, next)
});
router.get('/list',function (req,res) {
    roleController.list(req, res)
});
router.get('/:id', function (req, res, next) {
    roleController.getById(req, res, next)
});

router.put('/:id', function (req, res, next) {
    roleController.update(req, res, next)
});
router.delete('/:id', function (req, res, next) {
    roleController.delete(req, res, next)
});
module.exports = router;
