const models = require("../models/index");
const operationtemplateModel = models['OperationTemplates'];
const operationModel = models['Operations'];
const articleModel = models['Articles'];
const orderModel = models['Orders'];
const clientModel = models['Clients'];
const bundleModel = models['Bundles'];
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class OperationtemplateController extends ApiController {

    constructor() {
        super();
        this.entity_model = operationtemplateModel;
        this.entity_id_name = 'operation_type_id';
        this.list_includes = [
            {
                model: articleModel,
                as: 'Articles'
            },
            {
                model: clientModel,
                as: 'Clients'
            }

        ];
    }

    generateurOrder(req, res) {
        let code = req.body.code;
        let article_id = Number(req.body.article_id);
        let client_id = Number(req.body.client_id);
        let bundles = req.body.bundles;
        let _this = this;
        return new Promise(function(resolve, reject) {

            if (!code) {
                return res.send({
                    success: false,
                    data: null,
                    messages: 'order does not exists',
                });
            }

            if (!article_id) {
                return res.send({
                    success: false,
                    data: null,
                    messages: 'article does not exists',
                });
            }

            if (client_id === null) {
                return res.send({
                    success: false,
                    data: null,
                    messages: 'client does not exists',
                });
            }

            if (!bundles || typeof bundles !== "object" || !bundles.length) {
                return res.send({
                    success: false,
                    data: null,
                    messages: 'Bundles not exists',
                });
            }

            orderModel.create({
                code: code,
                article_id: article_id,
                client_id: client_id,

            }).then(orderCreated => {
                if (!orderCreated) {
                    res.status(400).send({'message': 'something is wrong'});
                } else {
                    let bundles_promises = [];
                    bundles.forEach(bundle_item => {
                        bundles_promises.push(_this.generateBundle(bundle_item, orderCreated));
                    });

                    Promise.all(bundles_promises).then(function(bundles_created) {
                        const new_order = orderCreated.toJSON();
                        new_order.bundles = bundles_created;
                        res.status(200).send({'message': 'bundle crated', new_order: new_order});
                    }).catch(error => res.status(400).send(error))
                }
            })
                .catch(error => res.status(400).send(error))
        })
    }

    generateBundle(bundleData, orderCreated) {
        let _this = this;
        return new Promise((resolve, reject) => {
            bundleModel.create({
                order_id: orderCreated.order_id,
                code: bundleData.code,
                quantity: bundleData.quantity,
                color: bundleData.color,
                size: bundleData.size
            }).then(bundleCreated => {
                if (bundleCreated) {
                    _this.generateOperationsForBundle(bundleCreated, orderCreated.article_id).then(operations => {
                        const bundleCreatedObj = bundleCreated.toJSON();
                        bundleCreatedObj.operations = operations;
                        resolve(bundleCreatedObj);
                    })
                } else {
                    reject(null);
                }
            })
            .catch(error => reject(error))
        });
    }

    generateOperationsForBundle(bundle, article_id) {
        let _this = this;
        return new Promise((resolve, reject) => {
            const operations = [];
            operationtemplateModel.findAll({
                where: {
                    article_id: article_id,
                }
            }).then(operations => {
                let operations_promises = [];
                operations.forEach(operation_template_item => {
                    operations_promises.push(_this.generateOperationItemForBundle(operation_template_item, bundle));
                });

                Promise.all(operations_promises).then(operations_created => {
                    resolve(operations_created);
                }).catch(error => reject(error));
            });
        });
    }

    generateOperationItemForBundle(operation_template_item, bundle) {
        return new Promise((resolve, reject) => {
            operationModel.create({
                code: operation_template_item.code,
                label: operation_template_item.label,
                description: operation_template_item.description,
                time: operation_template_item.time,
                machine_type_id: operation_template_item.machine_type_id,
                bundle_id: bundle.bundle_id,
            }).then(operation_created => {
                resolve(operation_created);
            })
            .catch(error => reject(error));
        })
    }

}

module.exports = OperationtemplateController;
