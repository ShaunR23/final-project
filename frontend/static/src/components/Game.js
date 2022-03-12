import { useState, useEffect} from "react"
import Questions from "./Questions";
import { handleError } from "../utils";

function CurrentQuestion({
        handleAnswer,
        incorrectAnswer1,
        incorrectAnswer2,
        incorrectAnswer3,
        question,
        correctAnswer,
        
        
}) {
return(
    <>
<div class="bg-gradient-to-r from-green-400 via-green-600 to-green-800 w-screen h-screen flex justify-center items-center">
    <div class="container">
        <div id="question-container" class="hide">
            <div id="question">{question}</div>
            <div id="answer-buttons" class="grid gap-4 grid-cols-2 my-7">
                <button class="btn">{incorrectAnswer1}</button>
                <button class="btn">{incorrectAnswer2}</button>
                <button class="btn">{incorrectAnswer3}</button>
                <button class="btn">{correctAnswer}</button>
            </div>
        </div>
        {/* <div class="flex justify-center gap-4">
            <button id="start-btn" class="bg-pink-700 px-9 py-3 text-white text-2xl rounded-lg hover:bg-pink-400">Start</button>
            <button id="next-btn" class="bg-pink-700 px-9 py-3 text-white text-2xl rounded-lg hover:bg-pink-400">Next</button>
        </div> */}

        </div>

</div>

    </>


)}
{/* //     <article className="text-center">
//     <div>
//       <h6>{question}</h6>
//       <div>
//         <button>{incorrectAnswer1}</button>
//         <br></br>
//         <button>{incorrectAnswer2}</button>
//         <br></br>
//         <button>{incorrectAnswer3}</button>
//         <br></br>
//         <button onClick={handleAnswer}>{correctAnswer}</button>

//       </div>
//     </div>
//   </article> */}
 

function Game(props){
const [questions, setQuestions] = useState(props.questions)
const dailyQuestions = []

const handleAnswer = (e) => {
    e.preventDefault();

    const updatedQuestions = [...questions];
    updatedQuestions.shift();
    setQuestions(updatedQuestions);
   
  };

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

//   const trivia = questions.map((question) => (
//     <CurrentQuestion key = {question.id} {...question}  />
//   ));

const trivia = questions.slice(0,10).map((question) => (
  <CurrentQuestion key = {question.id} {...question} handleAnswer={handleAnswer}  />
));
// console.log(trivia[0])
  function newQuestions(arr) {
        // arr.push();
        dailyQuestions.push(arr.slice(0,10))
      
    }
newQuestions(trivia)


  



//   const question = <CurrentQuestion key={questions.id} question={questions[0]} />

return (
    <>
    <div>{trivia[1]}</div>
    </>

)
}
Game.defaultProps = {
    questions: [],
};

export default Game