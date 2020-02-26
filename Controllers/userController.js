const models = require("../models/index");
const rolesModel = models['Roles'];
const userModel = models['Users'];
const Sequelize = require("sequelize");
const validate = require("../helpers/validate");
const ApiController = require("./apiController");

class userController extends ApiController {

    constructor() {
        super();
        this.entity_model = userModel;
        this.entity_id_name = 'user_id';
        this.list_includes = [
            // {
            //     model: rolesModel,
            //     as: 'role_id'
            // }
        ];
    }
// conditions before we save data(validate the data )
    //the valid password should be >7
    //must validate the email
    //if the password and the email is validate
    //valid the roles
    //if the roles is valid you can hash the password
    processDataPreSave(objectToSave, req,res) {
        return new Promise((resolve, reject) => {
            const valid_password = (objectToSave && objectToSave.password && objectToSave.password.length > 7);
            const valid_email = (objectToSave && objectToSave.email && validate.isValidEmail(objectToSave.email));
            if (valid_password && valid_email) {
                rolesModel.count({
                    where: {
                        role_id: req.body.roles
                    }
                }).then(count_rolesFinded => {
                    if (req.body.roles.length !== count_rolesFinded) {
                        return reject({status: false, message: 'InvalidRoles'});
                    } else {
                        objectToSave.original_password = objectToSave.password;
                        objectToSave.password = validate.hashPassword(objectToSave.password);

                        return resolve(objectToSave);
                    }
                }).catch((error) => res.status(400).send(error));
            } else {
                if (!valid_password) {
                    return reject({status: false, message: 'InvalidPassword'})
                }
                if (!valid_email) {
                    return reject({status: false, message: 'InvalidEmail'})
                }
            }
        });
    }

    /*
        conditions after we save data
        1--the roles must be exist
        2--using the getUserWithRoles must get the user data without password
     */
    afterUpdate(userData, req,res){
        if (typeof req.body.roles !== 'undefined') {
            userData.setRoles(req.body.roles).then(function (associatedRoles) {
                userData.getUserWithRoles().then((userData) => {
                    res.status(200).send({
                        success: true,
                        data: userData
                    });
                }).catch((error) => res.status(400).send(error));
            });
        } else {
            res.status(200).send({
                success: true,
                data: user.getMeWithoutPassword()
            });
        }
    }
}

module.exports = userController;
