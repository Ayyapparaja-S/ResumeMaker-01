const mongoose = require("mongoose")
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Tour must have durations']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'Tour must have Group Size']
    },
    difficulty: {
        type: String,
        required: [true, 'Tour must have difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 3
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        required: [true, 'A tour must have a description']
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a imageCover']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        // Select: false //for exclude this key when send back in res
    },
    startDates: [Date],
    startLocation: {
     description:  String,
     type: {
        type: String,
        default: 'Point',
        enum: ["Point"]
     },
     coordinates: [Number],
     address: String
    },
    locations: [
        {
            description:  String,
            type: {
               type: String,
               default: 'Point',
               enum: ["Point"]
            },
            coordinates: [Number],
            address: String,
            day: Number
        }
    ],
    guides: [
       { 
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
    ],
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

tourSchema.index({price: 1, ratingsAverage: -1})
tourSchema.index({slug: 1})


tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
})

tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
  });
  

tourSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'guides',
        select: "-__v"
    })
    next();
})

const Tour = mongoose.model('Tour', tourSchema)
module.exports = Tour
