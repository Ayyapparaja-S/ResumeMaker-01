
const mongoose = require("mongoose")
const experienceSchema = new mongoose.Schema({
        role: String,
        company: String,
        startDate: String,
        endDate: String,
        content: String,
        points: [{
            subhead: String,
            subcontent: String
        }],
        personalInfo_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'personalInfo',
            required: [true, 'personalInfo id is required']
        }
    }
)

  
const Experience = mongoose.model('experience', experienceSchema, 'experience')
module.exports = Experience
