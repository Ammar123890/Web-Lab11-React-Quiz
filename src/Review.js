import React from "react";

function Review(props) {
  const { questions, userAnswers } = props;

  const score = userAnswers.reduce((acc, cur, index) => {
    return cur === questions[index].correct_answer ? acc + 1 : acc;
  }, 0);

  return (
    <div>
      <h1>Quiz Review</h1>
      <p>Your score is {score} out of {questions.length}</p>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <p>
              <strong>{index + 1}. {question.question}</strong>
            </p>
            <p>Your answer: {userAnswers[index]}</p>
            <p>Correct answer: {question.correct_answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Review;
