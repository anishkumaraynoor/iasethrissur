






const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    admno:{type:String,required: true},
    admyear:{type:String,required: true},
    admdate:{type:String,required: true},
    leftdate:{type:String,required: true},
    name:{type:String, required: true},
    gender:{type:String, required: true},
    dob:{type:String, required: true},
    religion:{type:String, required: true},
    caste:{type:String, required: true},
    category:{type:String, required: true},
    admcategory:{type:String, required: true},
    email:{type:String,required: true},
    mob:{type:String, required: true}, 
    class:{type:String,required: true},
    subject:{type:String,required: true},
    feepaid:{type:String,required: true},
    mandatorypaid:{type:String,required: true},
    tcno:{type:String},
    tcdate:{type:String}
})

const students = mongoose.model("students", studentSchema)
module.exports = students