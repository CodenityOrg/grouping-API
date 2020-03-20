const Spot = require('../models/Spot');

const {tryCatch} = require('../utils');

const average = (...nums) =>  nums.reduce((acc, val) => acc + val.quantity, 0) /nums.length;
const getHoursDiffBetweenDates = (date1, date2) => Math.abs(date1 - date2) / 36e5;


module.exports = {
    async create(req, res) {
        const {name, latitude, longitude, quantity = 0} = req.body;
        const {user} = req.headers;
        let spot = await Spot.nearest(latitude, longitude, name);
        const qtyByUser = spot.qtys.find(qty => qty.userId === user._id.toString());
        if (qtyByUser && getHoursDiffBetweenDates(qtyByUser.createdAt, new Date) < 1) {
            return res.sendStatus(200);
        }

        spot.qtys.push({
            quantity: Number(quantity),
            userId: user._id.toString(),
            createdAt: new Date
        });

        spot.average = Math.round(average(...spot.qtys));
        const [error, result] = await tryCatch(spot.save());

        if (error) {
            return res.sendStatus(500);
        }

        return res.json(result);
    },
    async getOne() {
        let spot = await Spot.nearest(latitude, longitude, "", false);
        return res.json(spot);
    },
    async list (req, res) {
        const [error, result] = await tryCatch(Spot.find({ "qtys.1": { "$exists": true } }));

        if (error) {
            console.log(error)
            return res.sendStatus(500);
        }

        return res.json(result);
    }
}