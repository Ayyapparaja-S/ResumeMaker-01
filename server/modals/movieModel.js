const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    Title: {
        type: String,
        require: [true, 'Movie name is required']
    },
    Year: String,
    Released: String,
    Runtime: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    imdbRating: String,
    Genre: String,
    Images: [String]
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie
