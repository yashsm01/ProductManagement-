const child = require("../models/ProductsCodes");

//Find product barcode List as per unique product ID
// Also, get single specific Barcode id  
const index = (req,res,next) => {
    console.log(req.body);
    child.find({$or:[{UPID: req.body.UPID},{UniqueCode:req.body.UniqueCode}]})
    .then((res) => {
        res.json({
            message:"successfully get Product... ",
            res
        })
    })
    .catch(err => {
        res.status(501).json({
            message:"An Error occured!"
        })
    })
}


//get List all stored Barcode data 
const getList = (req,res,next) => {
    child.find({})
    .then((res) => {
        res.json({
            message:"successfully Products...",
            res
        })
    })
    .catch(err => {
        res.status(501).json({
            message:"An Error occured!"
        })
    })
}

//create new Product code 
const store = (req,res,next) => {
 
    let ChildData = new child({
        UPID: req.body.UPID,
        BatchNo: req.body.BatchNo,
        ExpDt: req.body.ExpDt,
        MfgDt: req.body.MfgDt,
        UniqueCode: req.body.UniqueCode

    });
    ChildData.save()
    .then(user =>{
        res.status(200).json({
            message: user
        })
    })
    .catch(err => {
        res.status(501).json({
            message:"An Error occured!"
        })
    })
}
 
module.exports = {store,getList,index};




