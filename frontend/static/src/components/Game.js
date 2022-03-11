import { useState, useEffect} from "react"
import Questions from "./Questions";
import { handleError } from "../utils";

function CurrentQuestion({
    
        incorrectAnswer1,
        incorrectAnswer2,
        incorrectAnswer3,
        question,
        correctAnswer,
        
        
}) {
return(
    <article className="text-center">
    <div>
      <h6>{question}</h6>
      <div>
        <button>{incorrectAnswer1}</button>
        <br></br>
        <button>{incorrectAnswer2}</button>
        <br></br>
        <button>{incorrectAnswer3}</button>
        <br></br>
        <button>{correctAnswer}</button>

      </div>
    </div>
  </article>
)}

function Game(props){
const [questions, setQuestions] = useState(props.questions)
const dailyQuestions = []

const handleAnswer = (e) => {
    e.preventDefault();

    const updatedQuestions = [...questions];
    updatedQuestions.shift();
    setQuestions(updatedQuestions);
   
  };

const handleChoice = (event) => {
    event.preventDefault();

    
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