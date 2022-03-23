import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Questions from "./Questions";
import { handleError } from "../utils";
import Leaderboard from "./Leaderboard";
import ProfileView from "./ProfileView";
import Cookies from "js-cookie";
import { TwitterTimelineEmbed, TwitterShareButton } from "react-twitter-embed";
import { red } from "tailwindcss/colors";

function Question({ question, shuffled_answers, score, handleAnswer }) {
  const [counter, setCounter] = useState(15);
  const timer = useRef(null);

  const handleClick = ({ guess }) => {
    handleAnswer({ guess, counter });
    clearInterval(timer.current);
  };

  useEffect(() => {
    setCounter(15);
  }, [question]);

  useEffect(() => {
    if (counter === 0) {
      handleClick(false);
      return;
    }
    timer.current = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);

    return () => clearInterval(timer.current);
  }, [counter]);

  const answerButtons = shuffled_answers.map((answer, index) => {
    const key = Object.keys(answer)[0];
    return (
      <button
        key={index}
        className="btn"
        onClick={() => handleClick({ guess: answer[key] })}
      >
        {[key]}
      </button>
    );
  });

  return (
    <>
      <div className=" w-screen h-screen flex items-center">
        <div className="container">
          <div id="question-container" className="hide">
            <div id="question">{question}</div>
            <span className="text-light-red flex justify-center text-3xl">
              {counter}
            </span>
            <div id="answer-buttons" className="grid gap-4 grid-cols-2 my-7 ">
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

function Game(props) {
  const [mode, setMode] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  
  const [questions, setQuestions] = useState(props.questions);
  const [fetchingData, setFetchingData] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [score, setScore] = useState(0);
 
  const { isAuth } = useOutletContext();
  

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
  

//   const getScores = async () => {
//     const response = await fetch("/api/v1/leaderboard/", {
//       headers: {
//         Authorization: Cookies.get("Authorization"),
//       },
//     }).catch(handleError);
//     if (!response.ok) {
//       throw new Error("Network response was not OK!");
//     }
//     const data = await response.json();
//     setScores(data.top_scores);
//     setScoresHard(data.hard_mode_top_scores);
//   };

//   useEffect(() => {
//     getScores();
//   }, []);


  //   // Post score at end of game
  //   useEffect(() => {
  //     if (questionCount > 9) {
  //       setGameOver(true);

  //       const response = fetch(`/api/v1/user/score/`, options).catch(handleError);

  //     } else if (questionCount < 10) {
  //       let timer =
  //         counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

  //       if (timer == 0) {
  //         setTimeout(() => {
  //           const updatedQuestions = [...questions];
  //           updatedQuestions.shift();
  //           setQuestions(updatedQuestions);
  //           setCounter(15);
  //           setTotalAnswer(totalAnswer + 1);
  //           setQuestionCount(questionCount + 1);
  //           //   alert(revealAnswer);
  //           setIsCorrect(null);
  //         }, 2000);
  //       }

  //       return () => clearInterval(timer);
  //     }
  //   }, [counter]);

  //   let trivia = questions.map((question) => (
  //     <CurrentQuestion
  //       {...question}
  //       handleAnswer={handleAnswer}
  //       counter={counter}
  //       score={score}
  //     />
  //   ));

  const generateQuestion = () => {
    const question = questions[0];
    return <Question {...question} handleAnswer={handleAnswer} score={score} />;
  };

  if (!mode) {
    return (
      <div className=" flex flex-column justify-center mt-10 ">
        <div className="container home1 dark:bg-gray-800 shadow-lg dark:shadow-none rounded-2xl ml mt-32 hover:shadow-xl dark:hover:shadow-dark ">
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

  if (gameOver) {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <div className="container flex justify-center">
          <div id="question-container" className="hide ">
            <div id="question"></div>
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
