const path = require("path");
const multer = require("multer");

const MINE_TYPE_MAP = {
    "image/png" :"png",
    "image/jpeg" :"jpeg",
    "image/jpg" :"jpg"

}
var storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const isValid = MINE_TYPE_MAP[file.mimetype];
        let error = new Error("Invalide mime type");
        if(isValid){
            error = null;
        }
        cb(error, "middleware/images/");
    },
    filename:(req,file,cb) => {
        const filename = file.originalname
        .toLowerCase();
        const ext = MINE_TYPE_MAP[file.mimetype];
        cb(null, Date.now()+ "-"  +filename);
    }
});

var upload = multer({
    storage : storage,
    fileFilter: (req ,file , cb) => {
        const isValid = MINE_TYPE_MAP[file.mimetype];
        if(isValid){
            cb(null,true);
        }
        else{
            console.log("File is not supported!")
            cb(null,false);
        }
    }
    ,
    limits:{
        fileSize: 1024*1024*12 // 5MB
    }
});

module.exports = upload;