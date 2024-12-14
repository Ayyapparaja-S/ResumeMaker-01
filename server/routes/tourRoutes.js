const router = require("express").Router()
const { protectedRoute ,checkRestriction} = require("../controllers/authHandler")
const { createUserReview } = require("../controllers/reviewController")
const {getTours, createNewTour,getSingleTour, updateTour, deleteTour, aliasmiddleware, getTourStats, getMonthlyPlan} = require("../controllers/tourController")
const reviewRouter = require('./reviewRoutes');

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.use('/:tourId/reviews', reviewRouter)

router.route('/alias').get(aliasmiddleware,getTours)

router.route('/').get(getTours).post(protectedRoute,checkRestriction(['admin', 'lead-guide']),  createNewTour)

router.route('/:id').get(getSingleTour).patch(protectedRoute,checkRestriction(['admin', 'lead-guide']),updateTour).delete(protectedRoute,checkRestriction(['admin', 'lead-guide']), deleteTour)

// router.route('/:tourId/reviews').post(protectedRoute, checkRestriction(['user']), createUserReview)

module.exports = router