import { useState, useEffect } from "react";
import Questions from "./Questions";
import { handleError } from "../utils";

function CurrentQuestion({
    
  counter,
  score,
  handleAnswer,
  incorrectAnswer1,
  incorrectAnswer2,
  incorrectAnswer3,
  question,
  correctAnswer,
}) {
  return (
    <>
      <div className=" w-screen h-screen flex justify-center items-center">
        <div className="container">
          <div id="question-container" class="hide">
            <div id="question">{question}</div>
            <div id="answer-buttons" class="grid gap-4 grid-cols-2 my-7">
              <button className="btn ">{incorrectAnswer1}</button>
              <button className="btn ">{incorrectAnswer2}</button>
              <button className="btn ">{incorrectAnswer3}</button>
              <button className="btn" onClick={handleAnswer}>
                {correctAnswer}
              </button>
              <div className="text-green">{counter}</div>
              <div>{score}</div>
            </div>
          </div>
        </div>
      </div>
    </>
    // bg-gradient-to-r from-green-400 via-green-600 to-green-800
  );
}

function Game(props) {
  const [questions, setQuestions] = useState(props.questions);
  const [counter, setCounter] = useState(15);
  const [score, setScore] = useState(0)  
  
  const handleAnswer = (e) => {
    e.preventDefault();
    
    const updatedQuestions = [...questions];
    updatedQuestions.shift();
    setQuestions(updatedQuestions);
    score += counter ;
    
      
    setCounter(15)
  }

  const handleChoice = (e) => {
    e.preventDefault();
  };

  
  
  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch("/api/v1/trivia/").catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not OK!");
      } else {
        const data = await response.json();
        setQuestions(data);
      }
    };
    getQuestions();
  }, []);

  const trivia = questions
    .slice(0, 10)
    .map((question) => (
      <CurrentQuestion
        key={question.id}
        {...question}
        handleAnswer={handleAnswer}
        counter={counter}
      />
    ));

  


    useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (timer == 0) {
      const updatedQuestions = [...questions];
      updatedQuestions.shift();
      setQuestions(updatedQuestions);
      setCounter(15)
    }

    return () => clearInterval(timer);
  }, [counter]);

  
  console.log(counter);
  console.log(score);
  console.log (trivia)
  
  //   const question = <CurrentQuestion key={questions.id} question={questions[0]} />

  return (
    <>
      <div>{trivia[0]}</div>
    </>
  );
}
Game.defaultProps = {
  questions: [],
};

export default Game;
