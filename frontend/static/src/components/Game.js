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
        <p>{incorrectAnswer1}</p>
        <p>{incorrectAnswer2}</p>
        <p>{incorrectAnswer3}</p>
        <p>{correctAnswer}</p>

      </div>
    </div>
  </article>
)}

function Game(props){
const [questions, setQuestions] = useState(props.questions)
let numCorrect = 0

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
  const trivia = questions.map((question) => (
    <CurrentQuestion key={question.id} {...question} />
  ));

 
  


return (
    <div>{trivia.shift()}</div>

)
}
Game.defaultProps = {
    questions: [],
};

export default Game