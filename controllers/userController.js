const User = require('../models/User');
const {tryCatch} = require('../utils');
const jwt = require("jsonwebtoken");

module.exports = {
    async oauthLogin(req, res) {
        // TODO: Implement integration with Google and check oauth type (google or facebook)
        // TODO: Validate facebook access token
        const { name, email, accessToken } = req.body;
        const userParams = {
            name,
            email,
            accessToken
        };

        const [error, user] = await tryCatch(
            User.findOrCreate(userParams, { email })
        );

        if (!user) {
            return res.status(401).send({
                message: "No se pudo iniciar sesion"
            });
        }

        console.log(jwt.sign(user._id.toString(), 'sssshhhhhhhhh'))
        return res.json({...user.toJSON(), token: jwt.sign(user._id.toString(), 'sssshhhhhhhhh')});
    }
}