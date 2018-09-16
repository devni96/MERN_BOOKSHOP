const express= require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose= require('mongoose');
const cors=require('cors');
const routes = require('./routes/api');

mongoose.connect('mongodb://localhost:27017/bookshop',{ useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("db connected")
    }else{
        console.log("error in db")
    }
});
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:3000'}));
app.use('/book',routes);


app.listen(process.env.port|| 4000,function(){
    console.log("listening")
});