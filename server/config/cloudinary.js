const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

console.log('Cloudinary config:', cloudinary.config())

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'syllabus-papers',
      resource_type: 'raw',
      format: 'pdf',
      access_mode: 'public'
    }
  }
})

const upload = multer({ storage: storage })

module.exports = { cloudinary, upload }