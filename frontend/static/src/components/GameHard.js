import { useState, useEffect } from "react";
import Questions from "./Questions";
import { handleError } from "../utils";
import Leaderboard from "./Leaderboard";
import ProfileView from "./ProfileView";
import Cookies from "js-cookie";
import { TwitterTimelineEmbed, TwitterShareButton } from 'react-twitter-embed';




function CurrentQuestion({
  isCorrect,
  counter,
  score,
  setScore,
  handleAnswer,
  shuffled_answers,
  question,
  correctAnswer,
}) {
    const revealAnswer = `Wrong, the correct answer is ${correctAnswer}`;
  const answerButtons = shuffled_answers.map((answer) => {
    const key = Object.keys(answer)[0];
    return (
      <button className="btn" onClick={() => handleAnswer(answer[key])}>
        {[key]}
      </button>
    );
  });

  
  return (
    <>
      <div className=" w-screen h-screen flex justify-center items-center">
        <div className="container">
          <div id="question-container" className="hide">
            <div id="question">{question}</div>
            <div id="answer-buttons" className="grid gap-4 grid-cols-2 my-7">
              {answerButtons}
              <div className="text-green">{counter}</div>
              <div className="text-green"> score = {score}</div>
              {/* <div><{ isCorrect ? correct() : revealAnswer()}</div> */}
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
  const [gameOver, setGameOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  let [score_hard, setScore_hard] = useState(null);
  let [rightAnswer, setRightAnswer] = useState(null);
  let [totalAnswer, setTotalAnswer] = useState(null);
  let [questionCount, setQuestionCount] = useState(null);

  
  const correct = "Correct!!";
  
  const revealAnswer = `Wrong, the correct answer is ${props.correctAnswer}`;
  const handleAnswer = (value) => {
      
    setTimeout(() => {
      if (questionCount > 10) {
        setGameOver(true);
      } else if (value == true) {
        const updatedQuestions = [...questions];
        updatedQuestions.shift();
        setQuestions(updatedQuestions);
        setCounter(15);
        setScore_hard((score_hard += counter));
        setRightAnswer(rightAnswer + 1);
        setTotalAnswer(totalAnswer + 1);
        setQuestionCount(questionCount + 1);
        alert(correct);
      } else {
        setGameOver(true);
        setTotalAnswer(totalAnswer + 1);
        setQuestionCount(questionCount + 1);
        alert(revealAnswer);
        
      }
    }, 1000);
  };

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
    if (questionCount > 2) {
      setGameOver(true);
    } else if (questionCount < 3) {
      let timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

      if (timer == 0) {
        setTimeout(() => {
          const updatedQuestions = [...questions];
          updatedQuestions.shift();
          setQuestions(updatedQuestions);
          setCounter(15);
          setTotalAnswer(totalAnswer + 1);
          setQuestionCount(questionCount + 1);
          setIsCorrect(null);
          alert(revealAnswer);
          setGameOver(true);
        }, 2000);
      }

      return () => clearInterval(timer);
    }
  }, [counter]);

  let trivia = questions
    .slice(0, 10)
    .map((question) => (
      <CurrentQuestion
        {...question}
        handleAnswer={handleAnswer}
        counter={counter}
        score_hard = {score_hard}
        
        
      />
    ));

  //         const options = {
  //             method: "POST",
  //             headers: {
  //                 'Accept': 'application/json',
  //                 "X-CSRFToken": Cookies.get("csrftoken"),
  //             },
  //             body: JSON.stringify()
  //           };
  //            fetch("/api/v1/score/", options);
  //   }


  const gameOverScreen = () => (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className="container">
        <div id="question-container" className="hide">
          <div id="question"></div>
          <div>
            Correct Answers = {rightAnswer}: Total Questions {totalAnswer}: score = {score_hard}
          </div>
          <div className="text-green">{counter}</div>
          <div className="text-green"> score_hard = {score_hard}</div>
          <TwitterShareButton score_hard = {score.hard} rightAnswer = {rightAnswer} totalAnswer = {totalAnswer} 
    url={'https://final-project-sr23.herokuapp.com/'}
    options={{ text: `score: ${score_hard} You got ${rightAnswer} out of ${totalAnswer} correct`  
    , via: 'PressStartTrivia' }}
  />
          {/* <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false" data-size='large' data-via="PressStartTrivia"
          data-text= 'score bbbbbbbbbbbbb'>Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}


        </div>
      </div>
    </div>
  );
  console.log(counter);
  console.log(score_hard);
  console.log(trivia);
  console.log(rightAnswer);
  console.log(totalAnswer);
  console.log(gameOver);

  return (
    <>
      {/* <div>{trivia[0]}</div> */}
      <div>{gameOver ? gameOverScreen() : trivia[0]}</div>
    </>
  );
}
Game.defaultProps = {
  questions: [],
};

export default GameHard;