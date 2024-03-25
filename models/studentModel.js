






const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    admnumber:{
        type:String,
        required: true
    },
    class:{
        type:String,
        required: true    
    },
    admyear:{
        type:String,
        required: true 
    }
})

const students = mongoose.model("students", studentSchema)
module.exports = students