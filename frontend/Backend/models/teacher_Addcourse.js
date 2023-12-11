const mongoose = require('mongoose')

const teacher_Addcourse = new mongoose.Schema({
  course_title: {
    type: String,
    
  },
  course_description: {
    type: String,
  },
  user_id: String,
  student_id : String,
})


const teacher_AddCourseModel = mongoose.model ("teacher_Addcourse", teacher_Addcourse, 'teacher_AddCourse' )

module.exports = teacher_AddCourseModel