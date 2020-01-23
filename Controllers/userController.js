const {rows} = require("pg");
const models = require("../models/index");
const userModel = models['Users'];
const Sequelize = require("sequelize");
Op = Sequelize.Op;
const validate = require("../helpers/validate");
module.exports = {

    register(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        if (!validate.isValidEmail(req.body.email)) {
            return res.status(400).send({'message': 'Please enter a valid email address'});
        }
        if (!validate.isValidRf(req.body.rf_id)) {
            return res.status(400).send({'message': 'Please enter a valid reference started with B '});
        }

        userModel.findOne({
            where: {
                [Op.or]: [
                    {
                        user_name: req.body.user_name
                    },
                    {
                        email: req.body.email
                    },
                ]
            }
        }).then(findedUser => {
            if (findedUser) {
                return res.status(400).send({'message': 'Username or email already exists'});
            } else {
                const hashPassword = validate.hashPassword(req.body.password);
                userModel.create({
                    user_name: req.body.user_name.toLowerCase(),
                    last_name: req.body.last_name,
                    first_name: req.body.first_name,
                    email: req.body.email.toLowerCase(),
                    password: hashPassword,
                    rf_id: req.body.rf_id
                })
                    .then(user => res.status(201).send({
                        status: 201,
                        data: user,
                        message: req.body.user_name + " created "
                    }))
                    .catch(error => res.status(400).send(error))
            }
        });
    },

    login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        if (!validate.isValidEmail(req.body.email)) {
            return res.status(400).send({'message': 'Please enter a valid email address'});
        }

        userModel.findOne({
            where: {
                [Op.or]: [
                    /*{
                        user_name: req.body.user_name
                    },*/
                    {
                        email: req.body.email
                    },
                ]
            }
        }).then(findedUser => {
            if (!findedUser){
                return res.status(400).send({'message': 'User not founded'});
            } else if (!validate.comparePassword(req.body.password, findedUser.password)){
                return res.status(400).send({'message': 'Invalid password'});
            } else {
                const token = validate.generateToken(findedUser.id);
                findedUser = findedUser.toJSON();
                delete findedUser.password;
                return res.status(200).send({
                     token: token,
                    data: findedUser
                });
            }
        });
    },

    list(req, res) {
        userModel.findAll()
            .then(resultQuery => {
                res.send({
                    data: resultQuery,
                    success: true,
                    messages: [{
                        code: "01",
                        message: "Users.GetAllWithSuccess"
                    }]
                });
            }).catch(error => res.status(400).send(error))
    },

    getById(req, res) {
        let iduser = req.params.id;

        userModel.findOne({
            where: {
                id: iduser
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'user Not Found',
                });
            }
            return res.status(200).send(resultQuery);
        }).catch((error) => res.status(500).send(error));

    },

    update: function (req, res) {
        let iduser = req.params.id;
        userModel.findOne({
            where: {
                id: iduser
            }
        })
            .then(findersQuery => {
                if (!findersQuery) {
                    return res.status(404).send({
                        message: 'user Not Found',
                        status: false,
                    });
                } else {
                    findersQuery.update({
                        user_name: req.body.user_name,
                        last_name: req.body.last_name,
                        first_name: req.body.first_name,
                        rf_id: req.body.rf_id,
                        email: req.body.email,

                    })
                        .then((user) => {
                            res.status(200).send({status: 'Updated  ' + req.body.user_name, data: user})
                        })
                        .catch((error) => res.status(400).send(error));
                }
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        let id = req.params.id;

        userModel.findOne({
            where: {
                id: id
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }

            resultQuery.destroy()
                .then(() => res.status(204).send({
                    status: 'destroy',
                    message: ' user have been deleted ',
                }))
                .catch((error) => res.status(400).send(error));
        })
            .catch((error) => res.status(400).send(error));

    },

};
