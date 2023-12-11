const mongoose = require('mongoose')

const teacher_Addtopic = new mongoose.Schema({
  weekNumber: {
    type: String,
  },
  PDFdescription: {
    type: String,
  },
  file: {
    // You mights want to tore the file URL or path in the database
    type: String, // or a file reference such as an S3 object key
  },
  course_id: String,
})


const teacher_AddTopicModel = mongoose.model ("teacher_Addtopic", teacher_Addtopic, 'teacher_AddTopic' )

module.exports = teacher_AddTopicModel