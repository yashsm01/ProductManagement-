const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const AuthRouter = require("./routes/Auth");
const ProductMasterRouter = require("./routes/masterRoutes");
const ProductCodesRouter = require("./routes/ChildRouter");

//make Connection with mongodb 
mongoose
  .connect(
    "mongodb+srv://user2:Qaswedfr123@cluster0.q7fla.mongodb.net/myDB?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


app.use(bodyParser.json());//To allow To parse requested body from frontend
app.use(bodyParser.urlencoded({extended:false}));
app.use('/middleware/images',express.static('middleware/images')); //alllow To get stored img in server
app.use(express.json());
app.use(cookieParser());// To set and Get cookie storage

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept","Authorization"
    );
    res.setHeader(  
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });


  app.use("/api",AuthRouter);//login Registor Routes
  app.use("/api/master",ProductMasterRouter);//Product MAster Routes
  app.use("/api/codes",ProductCodesRouter);//Product Codes Routes

  module.exports = app;