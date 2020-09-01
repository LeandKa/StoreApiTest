const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../image'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    },
    fileFilter: (req, file, cb) => {
        if (file.minetype !== 'img/png' || file.minetype !== 'img/jpeg') {
            return cb(null, false);
        } else {
            cb(null, true);
        }
    }
})


const upload = multer({
    storage: fileStorage})

module.exports = upload;