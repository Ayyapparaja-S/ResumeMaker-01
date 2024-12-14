const { getAccounts, createNewAccount } = require('../controllers/accountController')
const { protectedRoute } = require('../controllers/authHandler')
const { createModelControllers } = require('../controllers/commonController')
const router = require('express').Router()

const setRoutes = (controllers) => {
   controllers.forEach((controller)=> {
   const [key] =  Object.keys(controller);
   const {getAll, createNew , update , deleteOne, getSingle, middlewares={}} = controller[key]
   let {getAll: getAllPre=[], createNew: createNewPre=[] , update: updatePre=[] , deleteOne: deleteOnePre=[], getSingle: getSinglePre=[]} = middlewares
   router.route(`/${key}`).get(getAll).post(...createNewPre, createNew)
   router.route(`/${key}/:id`).get(getSingle).patch(update).delete(deleteOne)
})

}

const protectedControllers = createModelControllers.filter((controller)=>{
   const [key] =  Object.keys(controller);
   const {ProtectedRoute} = controller[key]
   return ProtectedRoute === true
} )

const defaultControllers = createModelControllers.filter((controller)=>{
   const [key] =  Object.keys(controller);
   const {ProtectedRoute} = controller[key]
   return !ProtectedRoute
})

setRoutes(defaultControllers)

router.use(protectedRoute)

setRoutes(protectedControllers)

module.exports = router
