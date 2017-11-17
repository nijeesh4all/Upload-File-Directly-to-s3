var s3 = require('./s3Service')
var file = require('./fileHandler')
var express = require('express')
const path = require("path");
const multer = require('multer');
const express = require('express'); 
const bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.post('/fileUpload',function(req,res){

    // Files Formates to be allowed
    req.fileExt = ['.jpeg','.jpg','.png']
    file(req,res,(file)=>{

        //saved File Location
        var fileLoc = req.files[0].path;

        //S3 Location
        var s3Location = 'location'
        //Uploadint to S3
        
        s3(fileLoc,s3Location)
            .then(res=>{
                console.log(res);
            });

    });
    

});
