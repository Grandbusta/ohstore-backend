const dotenv=require('dotenv').config()

module.exports={
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
    JWT_KEY:process.env.JWT_KEY,
    DB_NAME:process.env.DB_NAME,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_USER:process.env.DB_USER,
    DB_HOST:process.env.DB_HOST,
}