const { setUserID, setPersonalInofID } = require("../common/commonMiddlewares")
const Account = require("../modals/accountModal")
const Education = require("../modals/EducationModal")
const Experience = require("../modals/ExperienceModal")
const Movie = require("../modals/movieModel")
const personalInfo = require("../modals/PersonalInfo")
const User = require("../modals/UserResume")
const { getAll, updateOne, deleteOne, getOne, createOne } = require("./handlerFactory")

const models = [
{
    model: personalInfo,
    name: "personalInfo",
    ProtectedRoute: true,
    middlewares: {
            createNew: [setUserID]
        },
    popOptions: {
        getSingle:['experience', 'education']
    },
    filterOptions: {
        getAll: [{key: 'user'}]
    }
},
{
    model: Experience,
    name: "experience",
    ProtectedRoute: true
},
{
    model: Education,
    name: "education",
    ProtectedRoute: true
},
]

exports.createModelControllers = models.map((modelData) => {
    const {model, name, ProtectedRoute=false, middlewares, popOptions={}, filterOptions={}} = modelData

    return {[name]: {
        getAll : getAll(model, filterOptions["getAll"] || undefined),
        update : updateOne(model),
        deleteOne : deleteOne(model),
        getSingle : getOne(model, popOptions["getSingle"] || undefined),
        createNew : createOne(model, popOptions["createNew"] || undefined),
        ProtectedRoute,
        middlewares
    }}

})

