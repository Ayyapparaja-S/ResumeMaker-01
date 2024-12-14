const router = require("express").Router()
const { signup, login, protectedRoute, checkRestriction, logout } = require("../controllers/authHandler")
const { modifyBody } = require("../controllers/requestResponseController")
const {getAllUsers, createNewUser,getSingleUser, updatePassword,updateMe, deleteMe, getMe} = require("../controllers/userController")


router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)


router.use(protectedRoute);
router.get('/Me', getMe, getSingleUser)
router.patch('/UpdateMe', updateMe)
router.delete('/deleteMe', deleteMe)
router.post('/updatepassword', updatePassword)

router.use(checkRestriction(['admin']))
router.route('/').get(getAllUsers).post(createNewUser)
router.route('/:id').get(getSingleUser)

module.exports = router