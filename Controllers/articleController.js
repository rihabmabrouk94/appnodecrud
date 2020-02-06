const models = require("../models/index");
const articleModel = models['Articles'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class ArticleController extends ApiController {

    constructor() {
        super();
        this.entity_model = articleModel;
        this.entity_id_name = 'article_id';
        this.list_includes = [

        ];
    }


}

module.exports = ArticleController;
