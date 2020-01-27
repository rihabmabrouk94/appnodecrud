const models = require("../models/index");
const roleModel = models['Roles'];
const userModel = models['Users'];

module.exports = {

    create(req, res) {
        roleModel.create({
            role_name: req.body.role_name,

        })
            .then(machine => res.status(201).send({
                status: 201,
                data: machine,
                message: req.body.role_name + " created "
            }))
            .catch(error => res.status(400).send(error))

    },

    list(req, res) {
        roleModel.findAll({
            include: [
                {
                    model: userModel,
                    as: 'Users',
                    through: { user_role: [] }
                }
            ],
        })
            .then(resultQuery => {
                res.send({
                    data: resultQuery,
                    success: true,
                    messages: [{
                        code: "01",
                        message: "role.GetAllWithSuccess"
                    }]
                });
            }).catch(error => res.status(400).send(error))
    },

    getById(req, res) {
        let role_id = req.params.id;

        roleModel.findOne({
            where: {
                role_id: Number(role_id)
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'role Not Found',
                });
            }
            return res.status(200).send(resultQuery);
        }).catch((error) => res.status(500).send(error));

    },

    update: function (req, res) {
        let role_id = req.params.id;

        roleModel.findOne({
            where: {
                role_id: Number(role_id)
            }
        })
            .then(findersQuery => {
                if (!findersQuery) {
                    return res.status(404).send({
                        message: 'role Not Found',
                        status: false,
                    });
                } else {
                    findersQuery.update({
                        role_name: req.body.role_name,

                    })
                        .then((box) => {
                            res.status(200).send({status: 'Updated  ', data: box})
                        })
                        .catch((error) => res.status(400).send(error));
                }
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        let id = req.params.id;

        roleModel.findOne({
            where: {
                role_id: Number(id)
            }
        }).then(function (resultQuery) {
            if (!resultQuery) {
                return res.status(404).send({
                    message: 'role Not Found',
                });
            }

            resultQuery.destroy()
                .then(() => res.status(204).send({
                    status: 'destroy',
                    message: ' role has been deleted ',
                }))
                .catch((error) => res.status(400).send(error));
        })
            .catch((error) => res.status(400).send(error));

    },

};
