






const express = require('express')
const studentController = require('../controller/studentController')
const multerConfig = require('../middlewares/multerMiddleware')
const router = new express.Router()


router.post('/importCSV',multerConfig.single('file'),studentController.importCSV)
router.get('/getByAdmNo/:pid',studentController.getByAdmNo)


module.exports = router