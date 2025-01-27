const multer = require("multer");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, path.resolve(`./public/uploads`));
   },
   filename: function (req, file, cb) {
     const fileName = `${Date.now()}-${file.originalname}`;
     cb(null, fileName);
   }
 })
 
exports.singleUpload = multer({ storage: storage }).single("coverImageURL"); 


// const multer = reequire("multer");

// const storage = multer.memoryStorage(); 

// exports.singleUpload = multer({ storage}).single("coverImageURL");