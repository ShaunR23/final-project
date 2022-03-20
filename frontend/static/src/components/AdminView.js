import { useState, useEffect } from "react";
import { handleError } from "../utils";
import {Card, Button, Modal} from "react-bootstrap"
import Cookies from "js-cookie";
import QuestionForm from "./QuestionForm";

function AdminView(props){
    const [questions, setQuestions] = useState(props.questions);
    const [view, setView] = useState(null);
    const [phase, setPhase] = useState();

    
    
    useEffect(() => {
        const getQuestions = async () => {
          const response = await fetch("/api/v1/admin/").catch(handleError);
          if (!response.ok) {
            throw new Error("Network response was not OK!");
          } else {
            const data = await response.json();
            setQuestions(data);
          }
        };
        getQuestions();
      }, []);

      const publishQuestion = async (id) => {
        
        const options = {
            method: "POST",
            headers: {
              "X-CSRFToken": Cookies.get("csrftoken"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(questions),
          };
      
          await fetch(`/api/v1/admin/${id}`, options);
           questions.phase = 'ACCEPTED'

      }



      const handleDelete = async (id) => {
       
            const options = {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
              },
            };
        
            const response = await fetch(`/api/v1/admin/${id}`, options).catch(
              handleError
            );
        
            if (!response.ok) {
              throw new Error("Network response was not OK");
            }
        
            const viewAfterDelete = view.filter((question) => {
              return question.id !== id;
            });
            setView(viewAfterDelete);
          };

      const questionList = questions.map((question) => (
        <article
        className=" text-center col col-md-3 "
      key={question.id}
    >
    
      <Card className = 'article-cards' >
        <h6 className='font-serif' >{question.question}</h6>
        <Card.Body>
          <p className='font-serif'>{question.incorrectAnswer1}</p>
          <p className='font-serif'>{question.incorrectAnswer2}</p>
          <p className='font-serif'>{question.incorrectAnswer3}</p>
          <p className='font-serif'>Correct Answer = {question.correctAnswer}</p>

          <button className="articleBtn" variant="primary" onClick={() => publishQuestion(question.id)}>
            Accept
          </button> 
          <br></br>
          <button className="articleBtn2 mt-1" variant="primary" onClick={() => handleDelete(question.id)}>
            Delete
          </button>
        </Card.Body>
      </Card>
    </article>

));


return(
    <div className="container content-row">
    <div className="row">{questionList}</div>
  </div>
    
)

}

AdminView.defaultProps = {
    questions: [],
    
};

export default AdminView
