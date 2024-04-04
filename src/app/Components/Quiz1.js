"use client"
import React, { useState } from 'react';
import "../styles/quiz.css"

const Quiz = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='quiz-container'>
      {showScore ? (
        <div className='score-section'>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {quizData.length}</p>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              Question {currentQuestion + 1} / {quizData.length}
            </div>
            <div className='question-text'>
              {quizData[currentQuestion].question}
            </div>
          </div>
          <div className='answer-section'>
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className='answer-option'
                onClick={() =>
                  handleAnswerOptionClick(
                    option === quizData[currentQuestion].correctAnswer
                  )
                }
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
