import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Questions from "./Questions";
import { handleError } from "../utils";
import Leaderboard from "./Leaderboard";
import ProfileView from "./ProfileView";
import Cookies from "js-cookie";
import { TwitterTimelineEmbed, TwitterShareButton } from "react-twitter-embed";
import { red } from "tailwindcss/colors";

function Question({ question, answer, shuffled_answers, score, handleAnswer }) {
  const [counter, setCounter] = useState(15);
  const [questionRecap, setQuestionRecap] = useState([])
  const [answerRecap, setAnswerRecap] = useState([])
  const timer = useRef(null);

console.log(answerRecap)
console.log(questionRecap)
  const handleClick = ({ event, guess }) => {
    const newClassName = guess ? "correct" : "incorrect";
    event.target.classList.add(newClassName);
    setTimeout(() => event.target.classList.remove(newClassName), 2000);
    handleAnswer({ guess, counter });
    clearInterval(timer.current);
    questionRecap.push(question)
    answerRecap.push(answer)
  };

  useEffect(() => {
    setCounter(15);
  }, [question]);

  useEffect(
    (guess) => {
      if (counter === 0) {
        handleAnswer({ guess, counter });
        console.log(answer)
        questionRecap.push(question)
        answerRecap.push(answer)


        return;
      }
      timer.current = setInterval(() => {
        setCounter((counter) => counter - 1);
      }, 1000);

      return () => clearInterval(timer.current);
    },
    [counter]
  );

const gameRecap = () => {
    return( 
<div>answerRecap</div>
    )}
  

  const answerButtons = shuffled_answers.map((answer, index) => {
    const key = Object.keys(answer)[0];
    return (
      <button
        key={index}
        className={`btn`}
        onClick={(event) => handleClick({ event, guess: answer[key] })}
      >
        {[key]}
      </button>
    );
  });

  return (
    <>
      <div className=" w-screen h-screen flex items-center">
        <div className="container">
          <div id="question-container " className="hide">
            <div id="question" className="text-white font-serif">
              {question}
            </div>
            <span className="text-light-red flex justify-center text-3xl">
              {counter}
            </span>
            <div id="answer-buttons" className="text-white  grid gap-4 my-7 ">
              {answerButtons}
            </div>
            <span className="text-white text-xl flex justify-center">
              Score: {score}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Game(props, gameRecap) {
  const [mode, setMode] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [answerRecap, setAnswerRecap] = useState([])
  const [questionRecap, setQuestionRecap] = useState([])

  const [questions, setQuestions] = useState(props.questions);
  const [fetchingData, setFetchingData] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [score, setScore] = useState(0);

  const { isAuth } = useOutletContext();

  
console.log(questions)

  const handleSelection = (selection) => {
    setMode(selection);
    setFetchingData(true);
  };

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch("/api/v1/trivia/", {
        headers: {
          Authorization: Cookies.get("Authorization"),
        },
      }).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not OK!");
      }

      const data = await response.json();
      if (data.score) {
        setAlreadyPlayed(true);
        return;
      }
      setQuestions(data);
      setFetchingData(false);
    };
    if (mode !== null) {
      getQuestions();
    }
  }, [mode]);

  // passes in true if answer is correct; false, otherwise
  const handleAnswer = ({ guess, counter }) => {
    setTimeout(() => {
      if (guess) {
        setScore(score + counter);
        setCorrectAnswers(correctAnswers + 1);
      }
      setTotalQuestions(totalQuestions + 1);

      const updatedQuestions = [...questions];
      updatedQuestions.shift();

      if (updatedQuestions.length === 0 || (mode == "hard" && guess == false)) {
        setGameOver(true);
        if (isAuth) {
          postScore();
        }
      }

      setQuestions(updatedQuestions);
    }, 2000);
  };

  const postScore = () => {
    const hard_mode = mode === "hard" ? true : false;

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        Authorization: Cookies.get("Authorization"),
      },
      body: JSON.stringify({ score, hard_mode }),
    };

    const response = fetch(`/api/v1/user/score/`, options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
  };

  const generateQuestion = () => {
    const question = questions[0];
    const answer = questions[0].correctAnswer
    const questionArr = questions[0].question
    
    answerRecap.push(answer)
    questionRecap.push(questionArr)
    console.log(answerRecap)
    return <Question {...question} answer = {answer} handleAnswer={handleAnswer} score={score} />;
  };
 
  if (!mode) {
    return (
      <div className=" flex flex-column justify-center mt-10 ">
        <h1 className="container text-white p-5 text-3xl flex justify-center">
          Welcome To Press Start Trivia!!
        </h1>
        <div className="container home1 dark:bg-gray-800 shadow-lg dark:shadow-none rounded-2xl ml mt-28 hover:shadow-xl dark:hover:shadow-dark ">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => handleSelection("normal")}
              className="p-4 text-white bg-reg-green hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-4 font-serif h-28"
            >
              Normal Mode
            </button>
            <button
              type="button"
              onClick={() => handleSelection("hard")}
              className="p-4 text-white bg-reg-green hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-4 font-serif "
            >
              Hard Mode
            </button>
          </div>
        </div>
      </div>
    );
  }
let uniqueAnswers = [...new Set(answerRecap)]
let uniqueQuestions = [...new Set(questionRecap)]
  if (gameOver) {
    return (
<>


      <div className=" w-screen h-32 mb-28 mt-28 flex justify-center items-center">
        <div className="container flex justify-center">
          <div id="score-container" className="hide ">
            <div id="score-recap"></div>
            <div className="leading-10 text-white mb-3">
              You got {correctAnswers} of {totalQuestions} correct!! <br></br>
              Score: {score}
            </div>


            

            <TwitterShareButton
              score={score}
              correctAnswers={correctAnswers}
              totalQuestions={totalQuestions}
              url={"https://final-project-sr23.herokuapp.com/"}
              options={{
                text: `You got ${correctAnswers} out of ${totalQuestions} correct for a score of ${score}`,
                via: "PressStartTrivia",
                size: "large",
              }}
            />
          </div>
        </div>
      </div>

      <div className=" w-screen  flex justify-center items-center">
        <div className="container flex justify-center">
          <div id="recap-container" className="hide ">
            <div id="question-recap"></div>
            <div className="leading-10 text-white mb-3">
            <h2 className ="text-center text-xl text-reg-blue">Question Recap</h2>

            {/* Needs to be refactored using map */}
            <div>1.) {uniqueQuestions[0]} {uniqueAnswers[0]}</div>
            
            <div>2.) {uniqueQuestions[1]} {uniqueAnswers[1]}</div>
            
            <div>3.) {uniqueQuestions[2]} {uniqueAnswers[2]}</div>
            
            <div>4.) {uniqueQuestions[3]} {uniqueAnswers[3]}</div>
            
            <div>5.) {uniqueQuestions[4]} {uniqueAnswers[4]}</div>
            
            <div>6.) {uniqueQuestions[5]} {uniqueAnswers[5]}</div>
            
            <div>7.) {uniqueQuestions[6]} {uniqueAnswers[6]}</div>
            
            <div>8.) {uniqueQuestions[7]} {uniqueAnswers[7]}</div>
           
            <div>9.) {uniqueQuestions[8]} {uniqueAnswers[8]}</div>
           
            <div>10.) {uniqueQuestions[9]} {uniqueAnswers[9]}</div>
           
            
            </div>
          </div>
          </div>
          </div>
      </>
    );
  }

  if (alreadyPlayed) {
    return (
      <>
        <div className=" flex  justify-center mt-32 ">
          <div className="container rounded-2xl mt-10 flex justify-center pt-10  pb-10">
            You have already played your round for the day.
          </div>
        </div>
      </>
    );
  }

  if (fetchingData) {
    return <div>Fetching data ...</div>;
  }

  return (
    <>
      <div>{generateQuestion()}</div>
    </>
  );
}
Game.defaultProps = {
  questions: [],
};

export default Game;
