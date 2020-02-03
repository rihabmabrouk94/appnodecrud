const jwt = require("jsonwebtoken");
const config = require(__dirname + '/../config/config.json');


module.exports = (req, res, next) => {

    try {

        // je dois vérifier si le secret est bien rajouté dans la config
        if (!config.secret) {
            throw "No secret token added";
        }

        // je dois vérifier si le header de la request contient un Authorization
        if (!req.headers.authorization) {
            throw "No token sended";
        }

        //découper l'Authorization en 2 colonnes pour separer le bearer token et le token
        const authorization = req.headers.authorization.split(' ');

        // verifier si il ya de bearer token
        if (!authorization[0] || authorization[0] !== 'Bearer' || !authorization[1]) {
            throw "Invalid bearer token";
        }

        // decoder le token ajouter et le verifier avec le key secret
        const token = authorization[1];
        const decodedToken = jwt.verify(token, config.secret);

        if (!decodedToken || !decodedToken.id) {
            throw "Invalid Token";
        } else {
            req.user_id = decodedToken.id;
            next();
        }


    } catch (e) {
        return res.status(401).json({
            // error: new Error('Invalid request!'),
            error: e.message,
             status: false
        });
        /// next();
    }
};
