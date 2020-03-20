const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const haversine = require('haversine');

const spotSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    qtys: {
        type: Array,
        default: []
    },
    average: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

async function findByDistance (latitude, longitude) {
    const spots = await this.find({}).exec();
    return spots.find((spot) =>
        haversine(
        {
            latitude: spot.latitude,
            longitude: spot.longitude
        },
        {
            latitude,
            longitude
        },
        { unit: 'meter'}) < 50
    );
}

spotSchema.statics.nearest = async function ( latitude, longitude, name = "", create = true) {
    findByDistance = findByDistance.bind(this);
    let spot = await findByDistance(latitude, longitude);

    if (create && !spot) {
        return await this.create({ name, latitude, longitude });
    }
    return spot;
}

module.exports = mongoose.model('Spot', spotSchema);