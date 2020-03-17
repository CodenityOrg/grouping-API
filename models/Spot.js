const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
    latitude: Number,
    longitude: Number,
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Spot', spotSchema);