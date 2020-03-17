const Spot = require('../models/Spot');

const {tryCatch} = require('../utils');


module.exports = {
    async create(req, res) {
        const {latitude, longitude, count = 1} = req.body;
        const [error, result] = await tryCatch(Spot.create({
            latitude,
            longitude,
            count
        }));

        if (error) {
            return res.sendStatus(500);
        }

        return res.json(result);
    },
    async updateSpotCounter(req, res) {
        const {id} = req.params;

        const [error, result] = await tryCatch(Spot.update({ _id: id }, { count: {$qte: 1} }));

        if (error) {
            return res.sendStatus(500);
        }

        return res.json(result);
    },
    async list (req, res) {
        const [error, result] = await tryCatch(Spot.find({}));

        if (error) {
            return res.sendStatus(500);
        }

        return res.json(result);
    }
}