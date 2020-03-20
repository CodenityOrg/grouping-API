const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const haversine = require('haversine');

const spotSchema = new Schema({
    latitude: Number,
    longitude: Number,
    qtys: {
        type: Array,
        default: []
    },
    average: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date
    }
});


module.exports = mongoose.model('Spot', spotSchema);