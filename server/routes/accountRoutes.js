const { getAccounts, createNewAccount } = require('../controllers/accountController')
const { createModelControllers } = require('../controllers/commonController')

const router = require('express').Router()


router.route('/').get(getAccounts).post(createNewAccount)

module.exports = router