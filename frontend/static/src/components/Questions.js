import { useState, useEffect } from "react";
import { handleError } from "../utils";
import { Card, Button, Modal } from "react-bootstrap";
import QuestionForm from "./QuestionForm";

function Question({
  incorrectAnswer1,
  incorrectAnswer2,
  incorrectAnswer3,
  question,
  correctAnswer,
  phase,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <article className="text-center col col-md-3">
      <Card>
        <h6>{question}</h6>
        <Card.Body>
          <p>{incorrectAnswer1}</p>
          <p>{incorrectAnswer2}</p>
          <p>{incorrectAnswer3}</p>
          <p>Correct Answer = {correctAnswer}</p>

          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <QuestionForm
                question={question}
                incorrectAnswer1={incorrectAnswer1}
                incorrectAnswer2={incorrectAnswer2}
                incorrectAnswer3={incorrectAnswer3}
                correctAnswer={correctAnswer}
                phase={phase}
              />
            </Modal.Body>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal>
          <Button
            className="questionBtn"
            variant="primary"
            onClick={handleShow}
          >
            Edit
          </Button>
        </Card.Body>
      </Card>
    </article>
  );
}

function Questions(props) {
  const [questions, setQuestions] = useState(props.questions);

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
    <Question key={question.id} {...question} />
  ));

  return (
    <div className="container content-row">
      <div className="row">{questionList};</div>
    </div>
  );
}

Questions.defaultProps = {
  questions: [],
};

export default Questions;
