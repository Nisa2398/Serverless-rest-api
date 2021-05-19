const express=require('express')
const router=express.Router()
const employee=require('../services/employeeservice')
const {userValidationRules,validate}=require('../validations/validation')
router.get('/employees',employee.getEmployees)
router.put('/employees',userValidationRules(),validate,employee.postEmployees)
router.delete('/employees/:email',employee.deleteEmployees)
module.exports=router