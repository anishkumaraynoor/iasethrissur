






const students = require('../models/studentModel')
const csv = require('csvtojson')

exports.importCSV = async(req,res)=>{
    
        var studentData = []
        csv()
        .fromFile(req.file.path)
        .then(async(response)=>{
            for(var x=0; x<response.length; x++){
                studentData.push({
                    name:response[x].name,
                    email:response[x].email,
                    admnumber:response[x].admnumber,
                    class:response[x].class,
                    admyear:response[x].admyear  
                })
            }
            try {
                await students.insertMany(studentData)
                res.status(200).json(studentData)
            } catch (error) {
                res.status(400).json(error)
            }
        })
}


exports.getByAdmNo = async(req,res)=>{
    console.log("inside getByAdmNo");
    const {pid} = req.params
    try {
        const studentDetails = await students.findOne({admnumber:pid})
        res.status(200).json(studentDetails)
    } catch (error) {
        res.status(401).json(error)
    }
}