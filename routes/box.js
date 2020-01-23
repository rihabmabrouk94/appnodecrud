const router = require('express').Router();
const  boxController = require('./../Controllers/boxController');

router.post('/create', function (req, res, next) {
    boxController.create(req, res)
});
router.get('/list',function (req,res) {
    boxController.list(req, res)
});
router.get('/:id', function (req, res, next) {
    boxController.get(req, res)
});

router.put('/:id', function (req, res, next) {
    boxController.update(req, res)
});
router.delete('/:id', function (req, res, next) {
    boxController.delete(req, res)
});
module.exports = router;
