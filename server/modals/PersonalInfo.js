const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema({
    templatename: {
        type: String,
        required: [true, 'Template Name is Required']
    },
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    role: String,
    mobile: String,
    email: String,
    linkedinlabel: String,
    linkedinlink: String,
    portfoliolink: String,
    address:String,
    summary:String,
    skills: [String],
    tools: [String],
    // education: [{
    //     study: String,
    //     university: String,
    //     startDate: String,
    //     endDate: String,
    //     grade: String
    // }],
    createdAt: {
        type: Date,
        default: Date.now(),
        // Select: false //for exclude this key when send back in res
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserResume',
        required: [true, 'Details must belong to the User']
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

personalInfoSchema.virtual('experience', {
    ref: 'experience',
    localField: '_id',
    foreignField: 'personalInfo_id'
  });

  personalInfoSchema.virtual('education', {
    ref: 'education',
    localField: '_id',
    foreignField: 'personalInfo_id'
  });


personalInfoSchema.pre(/^find/, function(next) {
    this.populate({
            path: 'user',
            select: 'name'
        })
    next();
})

const personalInfo = mongoose.model('personalInfo', personalInfoSchema)
module.exports = personalInfo
