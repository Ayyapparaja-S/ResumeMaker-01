

exports.catchError=(message,statusCode, document)=>{
    const err = new Error(message)
    err.statusCode = statusCode || 500;
    err.isOperational = true
    return err;
}


exports.catchAsync = fn => (req,res, next) => fn(req, res, next).catch(next)

