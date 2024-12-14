const User = require("../modals/UserResume")
const { catchAsync, catchError } = require("../utils/AppError")
const jwt = require("jsonwebtoken");


exports.signup= catchAsync(async(req, res)=> {
    const user = await User.create(req.body)
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({id: user._id}, secretKey);
    // const token = await jwt.generateToken(user._id)

    res.cookie('jwt', token,{
      expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      // secure: true, //only in production - need to use https
      httpOnly: true
    })

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user
        }
    })

})

exports.login = catchAsync( async(req,res, next)=> {
      const {email, password} =  req.body

      if(!email || !password){
       return next(catchError('Tour not found', 404))
      }

      let user = await User.findOne({email}).select("+password")

      let check = !user || !(await user.correctPassword(password, user.password))
      if(check){
        return next(catchError("Email or Password is incorrect", 401))
      }

      // const token = await generateToken(user._id)

      const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({id: user._id}, secretKey);

      res.cookie('jwt', token,{
        expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        // secure: true, //only in production - need to use https
        httpOnly: true
      })
    
      res.status(200).json({
    status: "success",
    token
      })

})

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expiresIn: new Date(Date.now() + 1), // Short expiration to invalidate the cookie
    httpOnly: true,
    // secure: tr ue // only in production
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
});


exports.protectedRoute =catchAsync( async(req, res, next) =>{
    let token = ''
    console.log("ayy check protectedRoute", req.headers.authorization)
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
     token = req.headers.authorization.split(' ')[1]
}

if(!token){
        return next(catchError("Authentication failed token doesn't exist", 401))
}

const status =await jwt.verify(token, process.env.JWT_SECRET,async(err, decoded)=> {
if(err) return next(catchError(`Authentication failed: ${err.message}`,403))

console.log("decoded data", decoded)

const user = await User.findById(decoded.id)
if(!user) return next(catchError(`Authentication failed: user doesn't exist`,401))

req.user = user
})


next()

})


exports.checkRestriction = (privillegeRoles) => {
return (req, res, next) => {
    let check  = privillegeRoles.includes(req.user.role)

    if(!check){
      return  next(catchError("you don't have permission to perform this action", 401))
    }

    next()
}
}