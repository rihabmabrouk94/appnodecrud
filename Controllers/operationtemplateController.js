const models = require("../models/index");
const operationtemplateModel = models['OperationTemplates'];
const operationModel = models['Operations'];
const articleModel = models['Articles'];
const orderModel = models['Orders'];
const clientModel = models['Clients'];
const bundleModel = models['Bundles'];
const MachineTypesModel = models['MachineTypes'];
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
    verifyexist(req,res){
        orderModel.findOne({
            where:{
                article_id:req.body.article_id
            },

        })

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

            orderModel.findOne({
                where: {
                    code: code,
                }
            }).then(orderFinded => {
                if (!orderFinded) {
                    _this.checkArticle(article_id).then(articleFinded => {
                        /*
                        return _this.createOrder({
                            code: code,
                            article_id: article_id,
                            client_id: client_id,
                            bundles: bundles,
                        }, req, res);
                         */
                        _this.checkClient(client_id).then(clientFinded => {
                            return _this.createOrderWithPromise({
                                code: code,
                                article_id: article_id,
                                client_id: client_id,
                                bundles: bundles,
                            }).then(responseCreation => {
                                res.status(200).send(responseCreation);
                            }).catch(err => res.status(400).send(err));
                        }).catch(err => res.status(400).send(err));
                    })
                    .catch(error => res.status(400).send(error));

                } else {
                    return res.status(400).send({
                        success: false,
                        data: null,
                        messages: 'order alredy existe',
                    });
                }

            })
                .catch(error => res.status(400).send(error))
        })
    }

    checkArticle(article_id) {
        let _this = this;
        return new Promise((resolve, reject) => {
            articleModel.findOne({
                where: {
                    article_id: article_id
                }
            }).then(articleFinded => {
                if (articleFinded) {
                    resolve(articleFinded)
                } else {
                    reject({
                        success: false,
                        data: null,
                        messages: 'article not exists',
                    })
                }
            })
                .catch(error => reject(error));
        })
    }

    checkClient(client_id) {
        let _this = this;
        return new Promise((resolve, reject) => {
            clientModel.findOne({
                where: {
                    client_id: client_id
                }
            }).then(clientFinded => {
                if (clientFinded) {
                    resolve(clientFinded)
                } else {
                    reject({
                        success: false,
                        data: null,
                        messages: 'client not exists',
                    })
                }
            })
                .catch(error => reject(error));
        })
    }

    createOrder(data, req, res) {
        let _this = this;
        orderModel.create({
            code: data.code,
            article_id: data.article_id,
            client_id: data.client_id,
        }).then(orderCreated => {
            if (!orderCreated) {
                res.status(400).send({message: 'something is wrong'});
            } else {
                let bundles_promises = [];
                data.bundles.forEach(bundle_item => {
                    bundles_promises.push(_this.generateBundle(bundle_item, orderCreated));
                });

                Promise.all(bundles_promises).then(function(bundles_created) {
                    const new_order = orderCreated.toJSON();
                    new_order.bundles = bundles_created;
                    res.status(200).send({message: 'bundle crated', new_order: new_order});
                }).catch(error => res.status(400).send(error))
            }
        })
        .catch(error => res.status(400).send(error))
    }

    createOrderWithPromise(data) {
        let _this = this;
        return new Promise((resolve, reject) => {
            orderModel.create({
                code: data.code,
                article_id: data.article_id,
                client_id: data.client_id,
            }).then(orderCreated => {
                if (!orderCreated) {
                    reject({message: 'something is wrong'});
                } else {
                    let bundles_promises = [];
                    data.bundles.forEach(bundle_item => {
                        bundles_promises.push(_this.generateBundle(bundle_item, orderCreated));
                    });

                    Promise.all(bundles_promises).then(function(bundles_created) {
                        const new_order = orderCreated.toJSON();
                        new_order.bundles = bundles_created;
                        resolve({message: 'bundle crated', new_order: new_order});
                    }).catch(error => reject(error))
                }
            })
                .catch(error => reject(error))
        });
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
        let _this = this;
        return new Promise((resolve, reject) => {
            operationModel.create({
                code: operation_template_item.code,
                label: operation_template_item.label,
                description: operation_template_item.description,
                time: operation_template_item.time,
                machine_type_id: operation_template_item.machine_type_id,
                bundle_id: bundle.bundle_id,
            }).then(operation_created => {
                if (operation_created) {
                    _this.generateMachinetypeForOperation(operation_created, operation_created.machine_type_id).then(operations => {
                        const machinetypeCreatedObj = operation_created.toJSON();
                        machinetypeCreatedObj.machine_type = operations;
                        resolve(operation_created);
                    })
                }
            })
                .catch(error => reject(error));
        })
    }

    generateMachinetypeForOperation(operation, machine_type_id){
        let _this = this;
        return new Promise((resolve, reject) => {
            const machinetype = [];
            MachineTypesModel.findAll({
                where: {
                    machine_type_id: machine_type_id,
                }
            }).then(machinetype => {
                let machinetypes_promises = [];
                machinetype.forEach(machinetype_template_item => {
                    machinetypes_promises.push(_this.generateMachineItemforOperation(machinetype_template_item, operation));
                });

                Promise.all(machinetypes_promises).then(machinetypes_created => {
                    resolve(machinetypes_created);
                }).catch(error => reject(error));
            });
        })
    }

    generateMachineItemforOperation(machine_type_item, operation){
        return new Promise((resolve, reject) => {
            MachineTypesModel.create({
                label: machine_type_item.label
            }).then(machinetypecreated => {
                resolve(machinetypecreated);
            })
                .catch(error => reject(error));
        })

    }
}

module.exports = OperationtemplateController;
