const Spot = require('../models/Spot');

const {tryCatch} = require('../utils');

const average = (...nums) =>  nums.reduce((acc, val) => acc + val.quantity, 0) /nums.length;
const getHoursDiffBetweenDates = (date1, date2) => Math.abs(date1 - date2) / 36e5;

module.exports = {
    async create(req, res) {
        const {latitude, longitude, quantity = 0} = req.body;
        let spot;
        const spots = await Spot.find({});
        const end = {
            latitude,
            longitude
        };
        spot = spots.find((spot) =>
            haversine(
            {
                latitude: spot.latitude,
                longitude: spot.longitude
            },
            end,
            { unit: 'meter'}) < 50
        );

        if (!spot) {
            spot = await this.create({ latitude, longitude });
        }

        const qtyByUser = spot.qtys.find(qty => qty.userId === userId);

        if (getHoursDiffBetweenDates(qtyByUser.createdAt, new Date) < 1) {
            return res.sendStatus(200);
        }

        spot.qtys.push({
            quantity: Number(quantity),
            userId: "adsdasdas"
        });

        spot.average = Math.round(average(...spot.qtys));
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
            console.log(error)
            return res.sendStatus(500);
        }

        return res.json(result);
    }
}