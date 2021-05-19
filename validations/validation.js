const { body,validationResult}=require('express-validator')
const userValidationRules=()=>{
    return[
        body('email').isEmail()
    ]
}
const validate=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    const extractedErros=[]
    errors.array().map(err=>extractedErros.push({[err.param]:err.msg}))
    return res.status(422).json({
        errors:extractedErros
    })
}
module.exports={
    userValidationRules,
    validate
}