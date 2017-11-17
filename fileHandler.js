var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({ 
    
    destination: function (req, file, cb) {
        cb(null, '/home/imhta/uploads')
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        name = `${Math.random().toString(36).substring(7)}${Math.random().toString(36).substring(7)}${ext}`
      cb(null, name) //Appending extention
    }
});

var uploads = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (req.fileExt.indexOf(path.extname(file.originalname).toLowerCase())==-1){
      req.rejectedFiles.push(file.originalname);
      return cb(null, false);
    }
    cb(null, true);
  }
});

module.exports = uploads; 

