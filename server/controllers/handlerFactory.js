const { catchAsync, catchError } = require("../utils/AppError")
const APIFeatures = require("../utils/FeatureUtils")


exports.deleteOne = Model =>  catchAsync(async(req,res, next) =>{
    let Doc = await Model.findByIdAndDelete(req.params.id)
      
 if(!Doc){
     return next(catchError('Document not found', 404))
 }

     res.status(200).json({
         status: "success",
        })
})


exports.updateOne = Model => catchAsync(async(req,res)=> {

    const document = await  Model.findByIdAndUpdate(req.params.id, req.body, {
         new: true, //returns the new object instead of the old one
         runValidators: true
      })
      
     if(!document){
         return next(catchError('document not found', 404))
     }
 
     res.status(200).json({
     status: "success",
     document
 })
  })

  
exports.createOne = (Model, pre) => catchAsync(async(req,res, next)=> {
    pre && pre()
    let document = await Model.create({...req.body})
    // let document = await Model.insertMany(req.body) // for inserting many documents as an array
    if(!document){
        return next(catchError('Document not found', 404))
    }
   
    res.status(201).json({status: 'success', document})
}
)


exports.getOne = (Model, popOptions) => catchAsync(async(req, res, next) => {

    let query = Model.findById(req.params.id)

    if(popOptions){
        if(Array.isArray(popOptions)){
            popOptions.forEach(popOption => {       
                query = query.populate(popOption)
            });
        }
        else
        query = query.populate(popOptions)
    }
    
    let document = await query
    // Tour.findOne({_id: req.params.id}) //shorthand of this
    // console.log("ayy check getOne", document, popOptions)
    if(!document){
        return next(catchError('document not found', 404))
    }

    res.status(200).json({
     status: "success",
     data: {
        document
     }
    })

})



exports.getAll = (Model, filterOptions) => catchAsync(async(req,res)=> {
    //mongoose way of filtering
    // const getfilters = Tour.find().where('duration').equals(5).where('difficulty').equals('easy')

    //Executing query

    
let filter= {}

if(filterOptions && filterOptions.length>0){
    filterOptions.map((filters)=> {
       if(filters.key === 'user'){
            filter[filters.key] = req.user._id
       }
    })
}

// console.log("ayy check filters", filter, req)

if(req.params.tourId) filter={tour: req.params.tourId}

    const query = Model.find(filter)
    const features = APIFeatures(query, req.query).filter().sorting().limitFields().paginate()
    const document = await features.query
res.status(200).json({
status: "success",
count: document.length,
document
})
})