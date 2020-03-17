module.exports = {
    async oauthLogin(req, res) {
        // TODO: Implement integration with Google and check oauth type (google or facebook)
        // TODO: Validate facebook access token
        const { first_name, last_name, email, accessToken } = req.body;
        const userParams = {
            firstName: first_name,
            lastName: last_name,
            email,
            accessToken
        };

        const { result: user } = await tryCatch(
            User.findOrCreate(userParams, { email })
        );

        if (!user) {
            return res.status(401).send({
                message: "No se pudo iniciar sesion"
            });
        }
        user.token = jwt.sign(user._id.toString(), config.secret);
        return res.json(user);
    }
}