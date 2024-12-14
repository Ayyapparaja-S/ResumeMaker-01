
const mongoose = require("mongoose")
const educationSchema = new mongoose.Schema({
        course: String,
        college: String,
        startDate: String,
        endDate: String,
        grade: String,
        course: String,
        specialization: String,
        personalInfo_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'personalInfo',
            required: [true, 'personalInfo id is required']
        }
    }
)

  
const Education = mongoose.model('education', educationSchema, 'education')
module.exports = Education
