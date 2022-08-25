const jwt = require("jsonwebtoken");

const authentications = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        //console.log(token," to");
        const decode = jwt.verify(token,'verySecretValue');
        req.user = decode;
        next();
    }
    catch(error) {
        res.json({
            message:'Authentication Failed ! ',
            error
        })
    }
}

module.exports = authentications;