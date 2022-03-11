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
            },
          };
      
          await fetch(`/api/v1/admin/${id}`, options);
           return props.phase = 'ACCEPTED'

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
        className="article-cards text-center col col-md-3"
      key={question.id}
    >
      <Card>
        <h6>{question.question}</h6>
        <Card.Body>
          <p>{question.incorrectAnswer1}</p>
          <p>{question.incorrectAnswer2}</p>
          <p>{question.incorrectAnswer3}</p>
          <p>Correct Answer = {question.correctAnswer}</p>

          <button className="articleBtn" variant="primary" onClick={() => publishQuestion(question.id)}>
            Accept
          </button> 
          <br></br>
          <button className="articleBtn" variant="primary" onClick={() => handleDelete(question.id)}>
            Delete
          </button>
        </Card.Body>
      </Card>
    </article>

));


return(
    <div className="container content-row">
    <div className="row">{questionList};</div>
  </div>
    
)

}

AdminView.defaultProps = {
    questions: [],
    
};

export default AdminView
