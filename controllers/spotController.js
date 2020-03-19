const Spot = require('../models/Spot');

const {tryCatch} = require('../utils');

const average = (...nums) => nums.reduce((acc, val) => acc + val.quantity, 0) /nums.length;
module.exports = {
    async create(req, res) {
        const {latitude, longitude, quantity = 0} = req.body;
        const spot = await Spot.nearest({
            latitude, longitude,
            quantity,
            userId: "dasdsa"
        });

        spot.qtys.push({
            quantity,
            userId: "adsdasdas"
        });

        spot.average = Math.floor(average([...spot.qtys, quantity]));
        const [error, result] = await tryCatch(spot.save());

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