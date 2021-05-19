const express=require('express')
const router=express.Router()
const employee=require('../services/employeeservice')
const {paramsuserValidationRules,userValidationRules,validate}=require('../validations/validation')
router.get('/employees',paramsuserValidationRules(),validate,employee.getEmployees)
router.put('/employees',userValidationRules(),validate,employee.postEmployees)
router.delete('/employees/:email',paramsuserValidationRules(),validate,employee.deleteEmployees)
module.exports=router