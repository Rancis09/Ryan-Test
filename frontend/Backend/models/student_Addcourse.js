const mongoose = require('mongoose')

const student_Addcourse= new mongoose.Schema({
  //user: {type:Schema.Types.ObjectId, ref: 'user_teachers'},
  user_id: String,
  course_id: String,
  course_title: String, 
  course_description: String,
  
})


const student_AddCourseModel = mongoose.model ("student_Addcourse", student_Addcourse, 'student_AddCourse' )

module.exports = student_AddCourseModel