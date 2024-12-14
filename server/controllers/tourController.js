const Tour = require("../modals/tourModal");
// const APIFeatures = require("../utils/FeatureUtils");
// const { catchAsync, catchError } = require("../utils/AppError");
const {deleteOne, updateOne, createOne, getOne, getAll} = require('./handlerFactory');
const { catchAsync } = require("../utils/AppError");

// let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.aliasmiddleware = (req,res,next)=> {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty'
    next();
}



exports.getTours = getAll(Tour)
exports.updateTour = updateOne(Tour)
exports.deleteTour = deleteOne(Tour)
exports.getSingleTour = getOne(Tour, {path: 'reviews'})
exports.createNewTour = createOne(Tour)



exports.getTourStats =catchAsync (async (req, res)=>{
     
    const stats = await Tour.aggregate([
        {
            $match: {ratingsAverage: {$gte: 4.5}}
        },
        {
            $group: {
                _id: '$difficulty',
                numTours: {$sum: 1},
                numRating: {$sum: '$ratingsQuantity'},
                avgRating: {$avg: '$ratingsAverage'},
                avgPrice: {$avg: '$price'},
                minPrice: {$min:'$price'},
                maxPrice: {$max: '$price'}
            }
        },
        {
            $sort: {avgPrice: 1}
        }
    ])


    res.status(200).json({
        status: 'success',
        data: {
            stats 
        }
    })


})


exports.getMonthlyPlan = async (req, res) => {
    try {
      const year = req.params.year * 1; // 2021
  
      const plan = await Tour.aggregate([
        {
          $unwind: '$startDates'
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`)
            }
          }
        },
        {
          $group: {
            _id: { $month: '$startDates' },
            numTourStarts: { $sum: 1 },
            tours: { $push: '$name' }
          }
        },
        {
          $addFields: { month: '$_id' }
        },
        {
          $project: {
            _id: 0
          }
        },
        {
          $sort: { numTourStarts: -1 }
        },
        {
          $limit: 12
        }
      ]);
  
      res.status(200).json({
        status: 'success',
        data: {
          plan
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
  