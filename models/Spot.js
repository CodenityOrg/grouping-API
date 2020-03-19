const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const haversine = require('haversine');

const spotSchema = new Schema({
    latitude: Number,
    longitude: Number,
    quantity: Array
});

spotSchema.statics.nearest = async function({latitude, longitude}) {
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
        return await this.create({ latitude, longitude, quantity: [0] });
    }

    return foundSpot;
}

module.exports = mongoose.model('Spot', spotSchema);