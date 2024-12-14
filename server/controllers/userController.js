const fs = require('fs');
const { catchAsync, catchError } = require('../utils/AppError');
const User = require('../modals/UserResume');
const { createOne, getOne, getAll } = require('./handlerFactory');




exports.updateMe = catchAsync(async (req,res, next)=> {
  const {password, confirmPassword} = req.body
  if(password || confirmPassword){
    return next(catchError("can't update password, pls try /UpdatePassword"))
  }

  let validKeys = ["name", "email"]

let reqObj = {}  

validKeys.map(key=> {
if(req.body.hasOwnProperty(key)){
reqObj[key] = req.body[key]
}
})

  let user = await User.findByIdAndUpdate(req.user.id, reqObj, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: "success",
    data: {
      user
    }
  })

})

exports.getMe = (req, res, next)=> {
  req.params.id = req.user.id
  next()
}

exports.deleteMe = catchAsync(async(req,res, next)=> {
     await User.findByIdAndUpdate(req.user.id, {active: false})

      res.status(200).json({
        status: "success",
        data: null
      })

})

exports.getAllUsers = getAll(User)
exports.createNewUser = createOne(User)
exports.getSingleUser = getOne(User)

exports.updatePassword = catchAsync(async(req, res, next)=> {
        let {oldpassword, password, confirmPassword} = req.body;

        if(user.password === oldpassword){
          return next(catchError("Old and new password should not be the same", 400))
        }

        const user = await User.findById(req.user.id).select("+password")

        if(!user.password || !oldpassword || !(await user.correctPassword( oldpassword, user.password))){
          return next(catchError("Old pasword does not match",400))
        }

        user.password = password
        user.confirmPassword = confirmPassword
        let newuser = await user.save();
      // let user = await  User.findByIdUpdate() // will not work as intended

        res.status(200).json({
          status: "success",
          data: {
            user: newuser
          }
        })

} )
