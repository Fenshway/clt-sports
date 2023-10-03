const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/images/event/');
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb)=>{
    const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if(mimeTypes.includes(file.mimetype)) {
        return cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only jpeg, jpg, png, and gif image files are allowed.'));
    }
};

exports.upload = multer({
    storage: storage,
    limits:{fileSize: 1*1024*1024},
    fileFilter: fileFilter
}).single('eventImage');

exports.fileUpload = (req, res, next)=>{
    this.upload(req, res, err=>{
        if(err) {
            err.status = 400;
            next(err);
        } else {
            next();
        };
    });
};