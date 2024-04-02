






const students = require('../models/studentModel')
const csv = require('csvtojson')

exports.importCSV = async(req,res)=>{
    console.log("inside importCSV");
        var studentData = []
        csv()
        .fromFile(req.file.path)
        .then(async(response)=>{
            for(var x=0; x<response.length; x++){
                studentData.push({
                    admno:response[x].admno,
                    admyear:response[x].admyear,
                    admdate:response[x].admdate,
                    name:response[x].name,
                    gender:response[x].gender,
                    dob:response[x].dob,
                    religion:response[x].religion,
                    caste:response[x].caste,
                    category:response[x].admdate,
                    admcategory:response[x].name,
                    email:response[x].email,
                    mob:response[x].mob,
                    class:response[x].class,
                    subject:response[x].subject,
                    feepaid:response[x].feepaid,
                    mandatorypaid:response[x].mandatorypaid,
                    tcno:response[x].tcno,
                    tcdate:response[x].tcdate  
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
    console.log(pid);
    let year = new Date().getFullYear()
    let month = new Date().getMonth()+1
    let academicYear = ""
    if(month>5){
        academicYear = `${year}-${(year+1+'').slice(2)}`
    }else{
        academicYear = `${year-1}-${(year+'').slice(2)}`
    }
    console.log(academicYear);
    try {
        const allStudents = await students.find()
        let lastTcNo = allStudents.filter(a=>a.tcno.slice(-7)==academicYear)
        let nextTcNo = 0
        if(lastTcNo==''){
            nextTcNo = 1
        }else{
            nextTcNo = Number(lastTcNo.map(a=>a.tcno.slice(0,3)).sort((a,b)=>b-a)[0])+1
        }
        console.log(nextTcNo);
        let studentDetails = await students.findOne({admno:pid})
        studentDetails = studentDetails.toJSON()
        studentDetails.nextTcNo = nextTcNo+'/'+academicYear
        console.log(studentDetails);
        res.status(200).json(studentDetails)
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.updateStudent = async(req,res)=>{
    console.log("Inside update student")
    const {pid} = req.params
    const {tcno, tcdate} = req.body
    try {
        const updatedStudent = await students.findByIdAndUpdate({_id:pid},{
            tcno, tcdate
        },{new:true})
        await updatedStudent.save()
        res.status(200).json(updatedStudent)
    } catch (error) {
        res.status(401).json(error)
    }
}