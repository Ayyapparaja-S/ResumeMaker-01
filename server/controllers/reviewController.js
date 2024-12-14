const Review = require("../modals/reviewModal")
// const { catchAsync } = require("../utils/AppError")
const { deleteOne, updateOne, createOne, getOne, getAll } = require("./handlerFactory")


exports.setUserReviewId = (req, res, next)=> {
  if(!req.body.tour) req.body.tour = req.params.tourId;

  if(!req.body.user) req.body.user = req.user.id
  next()
}


exports.getallReviews = getAll(Review)


exports.getReview = getOne(Review)

exports.createUserReview = createOne(Review)

exports.updateReview = updateOne(Review);

exports.deleteReview = deleteOne(Review)