"use client"
import React, { useState } from 'react';

const QuizPage = ({ module }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleOptionChange = (event) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = event.target.value;
      return updatedAnswers;
    });
  };

  const handleSubmitQuiz = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Implement logic to calculate score based on userAnswers and module data
    console.log('Submitted answers:', userAnswers); // For testing purposes
  };

  const currentSection = module.chapters[0].sections[currentQuestion];

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>{module.chapters[0].title}</h1>
      </header>
      <section className="quiz-instructions">
        <p>Please answer all questions. You need to score at least 80% to pass this quiz.</p>
      </section>
      <form className="quiz-form" onSubmit={handleSubmitQuiz}>
        {currentSection && ( // Check if currentSection exists before rendering
          <div key={currentQuestion} className="question">
            <h3>{`${currentQuestion + 1}. ${currentSection.title}`}</h3>
            {/* Map through options to generate radio buttons */}
            <ul className="options">
              {currentSection.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      name="question"
                      value={option}
                      checked={userAnswers[currentQuestion] === option}
                      onChange={handleOptionChange}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            {/* Navigation Buttons (conditional) */}
            {currentQuestion < module.chapters[0].sections.length - 1 && (
              <button type="button" className="next-btn" onClick={handleNextQuestion}>
                Next Question
              </button>
            )}
            {currentQuestion === module.chapters[0].sections.length - 1 && (
              <button type="submit" className="submit-btn">
                Submit Quiz
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default QuizPage;
