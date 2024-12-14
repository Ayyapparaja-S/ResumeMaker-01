const express = require("express")
const cors = require('cors');
// const tourRouter = require("./routes/tourRoutes")
// const reviewRouter = require("./routes/reviewRoutes")
// const accountRouter = require("./routes/accountRoutes.js")
const commonRouter = require("./routes/commonRoutes.js")
const rateLimit = require('express-rate-limit');
const userRouter = require("./routes/userRoutes");
const { catchError } = require("./utils/AppError");
const { AppError } = require("./controllers/errorController");


const app =  express();

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    // You may need to configure other headers like methods and headers as needed
    next();
  });
  
  // Enable CORS for all routes
  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }));

  // const limiter = rateLimit({
  //   max: 100,
  //   windowMs: 60 * 60 * 1000,
  //   message: 'Too many requests from this IP, please try again in an hour!'
  // });
  // app.use('/api', limiter);
  


// app.use('/api/v1/account', accountRouter)
// app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
// app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/', commonRouter)

app.all('*', (req,res,next)=> {
    next(catchError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Error handling middleware - express knows it is error handling middleware by passing 4 arguments
app.use(AppError)


module.exports = app