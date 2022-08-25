const Master = require("../models/ProductMaster");

//get specific Product Master as per Unique Product ID
const index = (req,res,next) => {
    Master.find({UPID: req.body.UPID})
    .then(user =>{
        res.status(200).json({
            message: "available",
            user
        })
    })
    .catch(err => {
        res.status(501).json({
            message:"An Error occured!"
        })
    })
}

//Get ALL Product Master
const getList = (req,res,next) =>{
    Master.find()
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

//create new Product Master 
const store = (req,res,next) => {
    const url = req.protocol + "://" + req.get("host");
    let Masterdata = new Master({
        UPID: req.body.UPID,
        ProductName: req.body.ProductName
    });
    Masterdata.Image = url + "/middleware/images/" + req.file.filename;
    Masterdata.save()
    .then(user =>{
        res.status(200).json({
            message:"Added Successfully..." ,
            user
        })
    })
    .catch(err => {
        res.status(501).json({
            message:"An Error occured!"
        })
    })
}

//Update Specific MasterProduct
const update = (req,res,next) => {
    const url = req.protocol + "://" + req.get("host");
    let Masterdata ={
        UPID: req.body.UPID,
        ProductName: req.body.ProductName,
        Image: url + "/middleware/images/" + req.file.filename
    };
    Master.updateOne({UPID: req.body.UPID}, Masterdata,{upsert: true})
    .then(user =>{
        res.status(200).json({
            message:"Products updated", 
            user
        })
    })
    .catch(err => {
        res.status(501).json({
            message:"An Error occured!"
        })
    })
};

//delete specific masterProduct
const destroy = (req,res,next) => {
    let UPID = req.body.UPID;

    Master.findOneAndDelete(UPID)
    .then(user =>{
        res.status(200).json({
            message:"Delete Successfully",
            message: user
        })
    })
    .catch(err => {
        res.status(501).json({
            message:"An Error occured!"
        })
    })
}



module.exports = {index,store,getList,update,destroy};