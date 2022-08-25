const mongoose = require("mongoose");
const productMasterSchema = mongoose.Schema({
    UPID: {type:String,require:true}, 
    ProductName: {type:String,require:true},
    Image: {type:String,require:true}
},
{timestamps: true});

module.exports =  mongoose.model('ProductMasterSchema',productMasterSchema);