
const mongoose = require('mongoose');

const teacher_AddQuiz = new mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher_AddCourseModel', // Assuming you have a Course model
    required: true,
  },
  questions: [
    {
      questionText: String,
      choices: [String],
      correctAnswer: String,
    },
  ],
});

const teacher_AddQuizModel = mongoose.model('teacher_AddQuiz', teacher_AddQuiz);

module.exports = teacher_AddQuizModel;
