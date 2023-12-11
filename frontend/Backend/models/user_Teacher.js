const mongoose = require('mongoose')


//User_Teacher
const user_TeacherSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthDate: String,
    gender: String,
    credentialsLink: String,
    avatar: String,
})


const user_TeacherModel = mongoose.model("user_Teachers", user_TeacherSchema,'user_teachers')


module.exports = user_TeacherModel