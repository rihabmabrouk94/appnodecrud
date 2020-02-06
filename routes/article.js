const router = require('express').Router();
const ArticleController = require('./../Controllers/articleController');
const ArticleControllerInst = new ArticleController();

router.post('/create', function (req, res, next) {
    ArticleControllerInst.create(req, res)
});

router.get('/list',function (req,res) {
    ArticleControllerInst.list(req, res)
});

router.get('/:id', function (req, res) {
    ArticleControllerInst.get(req, res);
});

router.put('/:id', function (req, res, next) {
    ArticleControllerInst.update(req, res)
});

router.delete('/:id', function (req, res, next) {
    ArticleControllerInst.delete(req, res)
});

module.exports = router;
