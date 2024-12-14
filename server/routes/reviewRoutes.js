const { protectedRoute, checkRestriction } = require('../controllers/authHandler')
const { getallReviews, createUserReview, deleteReview, updateReview, setUserReviewId, getReview } = require('../controllers/reviewController')

const router = require('express').Router({mergeParams: true})

router.use(protectedRoute)

router.route('/').get(getallReviews).post(checkRestriction(['user']),setUserReviewId, createUserReview)

router.route('/:id').delete(deleteReview).patch(updateReview).get(getReview)

module.exports = router