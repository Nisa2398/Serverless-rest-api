const AWS = require('aws-sdk');
const USERS_TABLE = process.env.USERS_TABLE;
const { body, validationResult } = require('express-validator');
const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1',
    // endpoint: 'http://localhost:8000',
    accessKeyId: process.env.APIKEY,  // needed if you don't have aws credentials at all in env
    secretAccessKey: process.env.SECRETKEY
  })
  // console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
};

exports.getEmployees=(req,res,next)=>{
    try{
    const params = {
        TableName: USERS_TABLE,
        Key: {
          email: req.query.email,
        },
      }
    dynamoDb.get(params, (error, result) => {
    if (error) {
      return res.status(400).json({ error: 'Could not get user' });
    }
    console.log(result)
    if (result) {
     
      return res.status(200).json(result)
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });
}
catch(err){
    res.status(404).json({ error: err });
  }  
}
exports.postEmployees=(req,res,next)=>{
  try{
    const { email, name,position } = req.body;
    const params = {
      TableName: USERS_TABLE,
      Item: req.body,
    }
  dynamoDb.put(params, (error,result) => {
  if (error) {
    return res.status(400).json(error);
  }
  return res.status(201).json({email,name,position});
  
});
}
catch(err){
  res.status(404).json({ error: err });
}  
}
exports.deleteEmployees=(req,res,next)=>{
  try{
    const params = {
      TableName: USERS_TABLE,
      Key: {
        email:req.params.email,
      },
    }
  dynamoDb.delete(params, (error, data) => {
  if (error) {
    return res.status(400).json(JSON.stringify(error, null, 2));
  }
  return res.status(200).json({message:'Deleted Successfully'});
  
});
}
catch(err){
  res.status(404).json({ error: err });
}  
}