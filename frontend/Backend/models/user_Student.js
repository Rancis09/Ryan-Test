const mongoose = require('mongoose')


//User_Student
const user_StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthDate: String,
    gender: String,
    avatar : String,
})


const user_StudentModel = mongoose.model("user_Students", user_StudentSchema,'user_students')


module.exports = user_StudentModel