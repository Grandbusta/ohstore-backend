const dotenv=require('dotenv').config()

module.exports={
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET
}