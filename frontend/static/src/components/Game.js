import { useState, useEffect } from "react";
import Questions from "./Questions";
import { handleError } from "../utils";

function CurrentQuestion( {
    
  counter,
  score,
  handleAnswer,
  incorrectAnswer1,
  incorrectAnswer2,
  incorrectAnswer3,
  question,
  correctAnswer,
}) {
    
  
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const answers = [
    { incorrectAnswer1 : false },
    { incorrectAnswer2: false },
    { incorrectAnswer3: false },
    { correctAnswer: true },
  ];

  shuffle(answers)
  const answerButton = Object.keys(answers).map((key) => (
    <button className="btn " onClick={() => handleAnswer(answers[key])}>
      {key}
    </button>
  ));

  return (
    <>
      <div className=" w-screen h-screen flex justify-center items-center">
        <div className="container">
          <div id="question-container" className="hide">
            <div id="question">{question}</div>
            <div id="answer-buttons" className="grid gap-4 grid-cols-2 my-7">
                {answerButton}
            
              {/* <button className="btn " onClick={handleWrongAnswer}>
                {incorrectAnswer1}
              </button>
              <button className="btn " onClick={handleWrongAnswer}>
                {incorrectAnswer2}
              </button>
              <button className="btn" onClick={handleWrongAnswer}>
                {incorrectAnswer3}
              </button>
              <button className="btn" onClick={handleAnswer}>
                {correctAnswer}
              </button> */}
              <div className="text-green">{counter}</div>
              <div>score = {score}</div>
            </div>
          </div>
        </div>
      </div>
    </>
    // bg-gradient-to-r from-green-400 via-green-600 to-green-800
  );
}

function Game(props, { choices }) {
  const [questions, setQuestions] = useState(props.questions);
  const [counter, setCounter] = useState(15);
  let [score, setScore] = useState(null);
  let [rightAnswer, setRightAnswer] = useState(null);
  let [totalAnswer, setTotalAnswer] = useState(null);

  const handleAnswer = () => {
    setTimeout(() => {
    if (true){
      const updatedQuestions = [...questions];
      updatedQuestions.shift();
      setQuestions(updatedQuestions);
      setCounter(15);
      setScore((score += counter));
      setRightAnswer(rightAnswer + 1);
      setTotalAnswer(totalAnswer + 1);
    }

    else{
      const updatedQuestions = [...questions];
      updatedQuestions.shift();
      setQuestions(updatedQuestions);
      setCounter(15);
      setTotalAnswer(totalAnswer + 1);
    }
    }, 3000);
  };

//   const handleWrongAnswer = (e) => {
//     setTimeout(() => {
//       const updatedQuestions = [...questions];
//       updatedQuestions.shift();
//       setQuestions(updatedQuestions);
//       setCounter(15);
//       setTotalAnswer(totalAnswer + 1);
//     }, 3000);
//   };

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch("/api/v1/daily-trivia/").catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not OK!");
      } else {
        const data = await response.json();
        setQuestions(data);
      }
    };
    getQuestions();
  }, []);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    if (timer == 0) {
      setTimeout(() => {
        const updatedQuestions = [...questions];
        updatedQuestions.shift();
        setQuestions(updatedQuestions);
        setCounter(15);
        setTotalAnswer(totalAnswer + 1);
      }, 3000);
    }

    return () => clearInterval(timer);
  }, [counter]);

  let trivia = questions
    .slice(0, 10)
    .map((question) => (
      <CurrentQuestion
        
        {...question}
        handleAnswer={handleAnswer}
        counter={counter}
      />
    ));
  console.log(counter);
  console.log(score);
  console.log(trivia);
  console.log(rightAnswer);
  console.log(totalAnswer);

  return (
    <>
      <div>{trivia}</div>
    </>
  );
}
Game.defaultProps = {
  questions: [],
};

export default Game;
