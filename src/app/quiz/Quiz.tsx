'use client';

import { useRouter } from 'next/navigation';
import { SessionProvider, useSession, signOut } from 'next-auth/react';
import React, { useState, useEffect } from "react";
import "./quiz.css";
import Background from "./Background";

type Question = {
  question: string;
  options: string[];
  answer: string;
  level: number;
};

const quizData: Question[] = [
  {
    question: "Which symbol is used to terminate a statement in C?",
    options: [";", ":", ".", ","],
    answer: ";",
    level: 1,
  },
  {
    question: "What is the correct syntax to declare a variable in C?",
    options: ["int x;", "variable x;", "x = int;", "declare int x;"],
    answer: "int x;",
    level: 1,
  }
];

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);

  const { data: session } = useSession();
  const currentQuestion = quizData[currentQuestionIndex];

  useEffect(() => {
    if (!currentQuestion) return;

    const timeForLevel = currentQuestion.level === 1 ? 15 : currentQuestion.level === 2 ? 25 : 35;
    setTimeLeft(timeForLevel);

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, currentQuestion]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion?.answer) {
      setScore(score + 1);
      setTimeSaved(timeSaved + timeLeft);
    }

    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const downloadScore = () => {
    const scoreData = {
      name: session?.user?.name,
      enrollmentNumber: session?.user?.id,
      totalScore: (score * 10) + timeSaved,
      correctAnswers: score,
      totalQuestions: quizData.length,
      totalTimeSaved: timeSaved,
    };

    const blob = new Blob([JSON.stringify(scoreData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'score.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <SessionProvider>
      <>
        <Background />
        <div className="quiz-container">
          <div className="quiz-background" />
          <div className="quiz-content">
            <h1 className="quiz-title">Quiz</h1>
            {currentQuestionIndex < quizData.length ? (
              <div>
                <h2 className="quiz-question">{currentQuestion.question}</h2>
                <div className="quiz-options">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className={`quiz-option ${selectedOption === option ? "selected" : ""}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <p>Time left: {timeLeft} seconds</p>
                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedOption || timeLeft === 0}
                  className="next-button"
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="quiz-result">
                <h2>Your score: {score}/{quizData.length}</h2>
                <p>Total time saved: {timeSaved} seconds</p>
                <button onClick={downloadScore} className="download-button">
                  Download Score
                </button>
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setScore(0);
                    setTimeSaved(0);
                  }}
                  className="restart-button"
                >
                  Restart Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    </SessionProvider>
  );
};

export default Quiz;
