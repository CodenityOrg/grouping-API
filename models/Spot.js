const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const haversine = require('haversine');

const spotSchema = new Schema({
    latitude: Number,
    longitude: Number,
    qtys: Array,
    average: {
        type: Number,
        default: 0
    }
});

spotSchema.statics.nearest = async function({latitude, longitude, quantity, userId}) {
    const spots = await this.find({});
    const end = {
        latitude,
        longitude
    };

    const foundSpot = spots.find((spot) =>
        haversine(
        {
            latitude: spot.latitude,
            longitude: spot.longitude
        },
        end,
        { unit: 'meter'}) < 200
    );

    if (!foundSpot) {
        return await this.create({ latitude, longitude, qtys: [{ quantity, userId }] });
    }

    return foundSpot;
}

module.exports = mongoose.model('Spot', spotSchema);