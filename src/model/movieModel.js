const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    rating: {
        type: mongoose.Decimal128,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
})


const Movie = mongoose.model('Movie', MovieSchema);


module.exports = { Movie }
