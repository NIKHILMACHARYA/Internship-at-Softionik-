const multer = require('multer');
const imageFilter=(req, file, cb)=> {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
    cb(new Error('Please upload an image.'))
    }
    cb(undefined, true)
    }

    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "public/images/employeeimage/");
        },
        filename:(req, file, cb) => {
          console.log('file',file.originalname);
          cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
        },
      });
      var uploadImage = multer({ storage: storage, fileFilter: imageFilter });
      module.exports = uploadImage;

Save Image name in database
var employee_image="";
    if (req.file) {
        employee_image = process.env.IMAGE_URL + "employeeimage/" + req.file.filename
}
