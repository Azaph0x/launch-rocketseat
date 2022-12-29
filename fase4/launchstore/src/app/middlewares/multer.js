const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images')
    },
    filename: (req, file, callback) => {
        callback(null,  `${Date.now().toString()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, next) => {
    const isAccepted = ['image/png', 'image/jpeg', 'image/jpg']
    .find(acceptedFormat => acceptedFormat == file.mimetype)
    if(isAccepted) {
        return next(null, true)
    }

    return cb(null, false)
}

module.exports = multer({
    storage,
    fileFilter
})