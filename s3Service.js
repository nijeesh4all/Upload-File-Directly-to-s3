"use strict";
var AWS = require("aws-sdk");
var path = require("path");
var Promise = require("bluebird");
var fs = require('fs');
AWS.config.loadFromPath(__dirname+'/config.json');
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });
var uploadParams = { Bucket: "tabe-main-bucket-s3", Key: '', Body: '' };
var S3Upload = function (file, location) {
    return new Promise(function (resolve, reject) {
        var fileStream = fs.createReadStream(file);
        fileStream.on('error', function (err) {
            return reject(new Error('File Read Error'));
        });
        uploadParams.Body = fileStream;
        if (!location) {
            location = 'misc';
        }
        uploadParams.Key = location + '/' + (new Date().toDateString()) + '/' + token() + path.extname(file);
        uploadParams.ACL = 'public-read';
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                reject(err);
            }
            if (data) {
                resolve(data);
            }
        });
    });
};
var rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
};
var token = function () {
    return rand() + rand(); // to make it longer
};
token();
module.exports = S3Upload;
