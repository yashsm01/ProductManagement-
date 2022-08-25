const mongoose = require("mongoose");
const productCodeSchema = mongoose.Schema({
    UPID: {type:String,require:true}, 
    BatchNo: {type:String,require:true},
    ExpDt: {type:String,require:true},
    MfgDt: {type:String,require:true},
    UniqueCode: {type:String,require:true}
},
{timestamps: true});

module.exports =  mongoose.model('ProductCodeSchema',productCodeSchema);