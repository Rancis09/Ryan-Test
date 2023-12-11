// Questionnaire.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Questionnaire = () => {
  const [answers, setAnswers] = useState({});

  const handleChoiceChange = (questionId, choice) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choice,
    }));
  };

  const questions = [
    {
      id: 1,
      text: 'What is the capital of France?',
      choices: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    },
    {
      id: 2,
      text: 'Which planet is known as the Red Planet?',
      choices: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    },
    {
      id: 3,
      text: 'What is the largest mammal in the world?',
      choices: ['Blue Whale', 'Elephant', 'Giraffe', 'Hippopotamus'],
    },
    {
      id: 4,
      text: 'Who wrote "Romeo and Juliet"?',
      choices: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain'],
    },
    {
      id: 5,
      text: 'Which programming language is this quiz written in?',
      choices: ['JavaScript', 'Python', 'Java', 'C++'],
    },
  ];

  return (
    <div className='courseQuiz'>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.text}</p>
          <div>
            {question.choices.map((choice, index) => (
              <label key={index}>
                <input
                  type='radio'
                  name={`question-${question.id}`}
                  value={choice}
                  checked={answers[question.id] === choice}
                  onChange={() => handleChoiceChange(question.id, choice)}
                />
                {choice}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Questionnaire;
