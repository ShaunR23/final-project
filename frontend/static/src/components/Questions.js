import { useState, useEffect } from "react";
import { handleError } from "../utils";
import {Card, Button, Modal} from "react-bootstrap"
import QuestionForm from "./QuestionForm";

function Questions(props){
    const [questions, setQuestions] = useState(props.questions)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const getQuestions = async () => {
          const response = await fetch("/api/v1/user/trivia/").catch(handleError);
          if (!response.ok) {
            throw new Error("Network response was not OK!");
          } else {
            const data = await response.json();
            setQuestions(data);
          }
        };
        getQuestions();
      }, []);

      const questionList = questions.map((question) => (
        <article
        className="text-center col col-md-3"
      key={question.id}
    >
      <Card>
        <h6>{question.question}</h6>
        <Card.Body>
          <p>{question.incorrectAnswer1}</p>
          <p>{question.incorrectAnswer2}</p>
          <p>{question.incorrectAnswer3}</p>
          <p>Correct Answer = {question.correctAnswer}</p>

          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <QuestionForm
                question = {question.question}
                incorrectAnswer1 = {question.incorrectAnswer1}
                incorrectAnswer2 = {question.incorrectAnswer2}
                incorrectAnswer3 = {question.incorrectAnswer3}
                correctAnswer = {question.correctAnswer}
                phase = {question.phase}
              />
            </Modal.Body>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal>
          <Button className="questionBtn" variant="primary" onClick={handleShow}>
            Edit
          </Button>
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

Questions.defaultProps = {
    questions: [],
};

export default Questions

