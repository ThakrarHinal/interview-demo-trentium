const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './public/uploadedfiles',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

const uploads = multer({ storage })

module.exports = uploads
