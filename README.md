# Upload Directly to S3

### Upload file direcly to AWS s3 from Express Webserver

This module allows you to upload files directly to s3 From Express server

## Requirements

For development, you will only need Node.js installed on your environement.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21
To see How to install node [click Here](https://nodejs.org/en/download/package-manager/)

## Installation

	`git clone https://github.com/nijeesh4all/Upload-File-Directly-to-s3-.git
	  cd Upload-File-Directly-to-s3 
      npm install` 

## Usage 

```js

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

```

