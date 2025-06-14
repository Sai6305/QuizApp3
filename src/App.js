import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    question: 'What is the capital of India?',
    options: ['Berlin', 'Paris', 'Delhi', 'Madrid'],
    answer: 'Delhi',
  },
  {
    question: 'Who developed React.js?',
    options: ['Google', 'Facebook', 'Twitter', 'Microsoft'],
    answer: 'Facebook',
  },
  {
    question: 'Which hook is used for state in React?',
    options: ['useState', 'useEffect', 'useRef', 'useMemo'],
    answer: 'useState',
  },
];

const QuizApp = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    if (showScore) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleAnswer('');
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQ, showScore]);

  useEffect(() => {
    if (showScore) {
      localStorage.setItem('lastScore', score);
    }
  }, [showScore]);

  const handleAnswer = (option) => {
    if (shuffledQuestions[currentQ]?.answer === option) {
      setScore(score + 1);
    }

    const nextQ = currentQ + 1;
    if (nextQ < shuffledQuestions.length) {
      setCurrentQ(nextQ);
      setTimeLeft(15);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setShuffledQuestions(shuffled);
    setScore(0);
    setCurrentQ(0);
    setShowScore(false);
    setTimeLeft(15);
  };

  return (
    <div className="quiz-container">
      <h2>🧠 React Quiz App</h2>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${((currentQ) / questions.length) * 100}%` }}
        ></div>
      </div>
      {showScore ? (
        <>
          <h3>Your Score: {score} / {questions.length}</h3>
          <p>📝 Last Score: {localStorage.getItem('lastScore')}</p>
          <button className="btn restart-btn" onClick={restartQuiz}>🔁 Restart Quiz</button>
        </>
      ) : (
        <div className="question-box">
          <p className="timer">⏳ Time Left: {timeLeft}s</p>
          <h4>{shuffledQuestions[currentQ]?.question}</h4>
          {shuffledQuestions[currentQ]?.options.map((opt, idx) => (
            <button key={idx} className="btn" onClick={() => handleAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
