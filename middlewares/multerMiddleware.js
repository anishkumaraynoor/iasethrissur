






const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename = `csv.csv`
        callback(null,filename)
    }
})

const multerConfig = multer({
    storage
})

module.exports = multerConfig