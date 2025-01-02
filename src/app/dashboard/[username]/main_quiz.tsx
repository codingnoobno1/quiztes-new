"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";




type Question = {
  question: string;
  options: string[];
  answer: string;
};

const quizData: Question[] = [
  {
    question: "Which symbol is used to terminate a statement in C?",
    options: [";", ":", ".", ","],
    answer: ";",
  },
  {
    question: "What is the correct syntax to declare a variable in C?",
    options: ["int x;", "variable x;", "x = int;", "declare int x;"],
    answer: "int x;",
  },
  // Add more questions as needed
];

const Quiz: React.FC = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>("");
  const [enrollmentNumber, setEnrollmentNumber] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // Total quiz time in seconds

  useEffect(() => {
    const storedNickname = sessionStorage.getItem("nickname");
    const storedEnrollmentNumber = sessionStorage.getItem("enrollmentNumber");

    if (!storedNickname || !storedEnrollmentNumber) {
      alert(
        "Session expired or user details missing. Redirecting to the home page."
      );
      router.push("/"); // Redirect to home page
    } else {
      setNickname(storedNickname);
      setEnrollmentNumber(storedEnrollmentNumber);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizData[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const endQuiz = () => {
    alert(`Time's up! Your score is ${score}/${quizData.length}.`);
    router.push("/");
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(300);
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-background" />
      <Sidebar />
      <div className="quiz-content">
        <h1 className="quiz-title">Quiz</h1>

        {/* User Info */}
        <div className="quiz-user-info">
          <p>Welcome, {nickname}</p>
          <p>Enrollment: {enrollmentNumber}</p>
          <p>Time Left: {timeLeft} seconds</p>
          <p>Score: {score}</p>
        </div>

        {/* WebSocket Data */}
        <div className="websocket-data">
          <h2>Live Updates:</h2>
          
        </div>

        {/* Quiz Questions */}
        {currentQuestionIndex < quizData.length ? (
          <div>
            <h2 className="quiz-question">{currentQuestion.question}</h2>
            <div className="quiz-options">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`quiz-option ${
                    selectedOption === option ? "selected" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={!selectedOption}
              className="next-button"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="quiz-result">
            <h2>
              Your score: {score}/{quizData.length}
            </h2>
            <button onClick={restartQuiz} className="restart-button">
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
