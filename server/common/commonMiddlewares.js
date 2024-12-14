

exports.setUserID = (req, res, next)=>{
    console.log("ayy check data", req.body)
    
    if(!req.body.user) req.body.user = req.user.id
    next()
} 

exports.setPersonalInofID = (req,res, next) => {
    const {personalInfo_id} = req.params
    if(req.body) req.body.personalInfo_id = personalInfo_id;
    next(   )
}