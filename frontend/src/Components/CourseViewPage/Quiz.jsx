import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = ({ id }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/quiz`);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleRadioChange = (questionId, choice) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choice,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quizzes.forEach((quiz) => {
      quiz.questions.forEach((question) => {
        const userAnswer = userAnswers[question._id];
        if (userAnswer === question.correctAnswer) {
          score += 1;
        }
      });
    });
    return score;
  };

  const handleSubmit = () => {
    const allCorrect = checkAnswers();
    setSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const checkAnswers = () => {
    let allCorrect = true;
    quizzes.forEach((quiz) => {
      quiz.questions.forEach((question) => {
        const userAnswer = userAnswers[question._id];
        if (userAnswer !== question.correctAnswer) {
          allCorrect = false;
        }
      });
    });
    return allCorrect;
  };

  return (
    <div className='courseQuiz'>
      <div className='QuizTitle'>
        <h2>Quiz</h2>
      </div>
      {quizzes.map((quiz) => (
        <div key={quiz._id}>
          <p>{quiz.question}</p>
          <ul className='choices-list'>
            {quiz.choices.map((choice, index) => (
              <li key={index}>
                <label>
                  <input
                    type='radio'
                    name={`question-${quiz._id}`}
                    value={choice}
                    checked={userAnswers[quiz._id] === choice}
                    onChange={() => handleRadioChange(quiz._id, choice)}
                  />
                  {choice}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {submitted && (
        <p>
          Your Score: {calculateScore()} /{' '}
          {quizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}
        </p>
      )}
      <button
        className='Quiz_submit-button'
        type='button'
        onClick={handleSubmit}
        disabled={submitted}
      >
        Submit Quiz
      </button>
      <button
        className='Quiz_retake-button'
        type='button'
        onClick={handleRetakeQuiz}
        disabled={!submitted}
      >
        Retake Quiz
      </button>
    </div>
  );
};

export default Quiz;
