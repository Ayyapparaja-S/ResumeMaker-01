
const signupKeys = ['name', 'email', 'password', 'confirmPassword', 'photo']

const requsetKeysMapping =(values) => {
    let newbody = {}
    Object.keys(values).map(key=> {
        if(signupKeys.includes(key)){
          newbody = {...newbody, [key]: values[key]}
        }
    })
    return newbody;
}

exports.modifyBody = (req, res, next) =>{
 req.body = requsetKeysMapping(req.body)
next()
}