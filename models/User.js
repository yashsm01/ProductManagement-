const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    Username: {type:String,require:true}, 
    Password: {type:String,require:true},
    userType: {type:String,require:true}
},
{timestamps: true});


module.exports =  mongoose.model('User',userSchema);