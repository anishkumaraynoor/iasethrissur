






const students = require('../models/studentModel')
const csv = require('csvtojson')

exports.importCSV = async(req,res)=>{
    try {
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
            await students.insertMany(studentData)
        })
        res.send({status:200, success:true, msg:'running'})
    } catch (error) {
        res.send({status:400, success:false, msg:error.message})
    }
    
}