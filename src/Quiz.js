import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Review from "./Review";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [remainingTime, setRemainingTime] = useState(10);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const navigate =  useNavigate();
  const { cat } = useParams();
  const { dif } = useParams();
  const category = cat;
  const difficulty = dif;

  useEffect(() => {
    console.log("Fetching questions for category", category, "with difficulty", difficulty);
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      )
      .then((response) => {
        console.log("Received questions data", response.data);
        setQuestions(response.data.results);
      })
      .catch((error) => console.error(error));
  }, [category, difficulty]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentQuestion]);

  useEffect(() => {
    if (remainingTime === 0) {
      handleNext();
    }
  }, [remainingTime]);

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
    setRemainingTime(10);
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    handleNext();
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      setCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setRemainingTime(10);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setRemainingTime(10);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <Review questions={questions} userAnswers={userAnswers} score={score} onRetry={handleRetry} />
    );
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const question = questions[currentQuestion];
  
  

  return (
    <div>
      <h1>Question {currentQuestion + 1}</h1>
      <p>Time remaining: {remainingTime}</p>
      <p>Score: {score}</p>
      <p>{questions[currentQuestion]?.question}</p>
      {questions[currentQuestion]?.incorrect_answers
        .concat(questions[currentQuestion]?.correct_answer)
        .sort()
        .map((answer) => (
          <button key={answer} onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Quiz;
