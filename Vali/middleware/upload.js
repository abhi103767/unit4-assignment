const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req,file,callback){
        callback(null,path.join(__dirname,'../upload'))
    },
    filename: function (req, file, callback) {
        const prePefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, prePefix + '-' + file.originalname);
      }
})

const fileFilter = function(req,file,callback){
       if ( file.mimetype === "image/jpeg" || file.mimetype === 'image/png' ){
           callback(null,true);
       }
       else {
           callback(null,false);
       }
}

const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 5,
    fileFilter: fileFilter,
})

module.exports = upload;