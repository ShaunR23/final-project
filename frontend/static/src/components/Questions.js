import { useState, useEffect } from "react";
import { handleError } from "../utils";
import { Card, Button, Modal } from "react-bootstrap";
import QuestionForm from "./QuestionForm";
import Cookies from "js-cookie";

function Question({
  incorrectAnswer1,
  incorrectAnswer2,
  incorrectAnswer3,
  question,
  correctAnswer,
  phase,
  id,
  setQuestions,
  questions,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [view, setView] = useState(null);

  const handleDelete = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch(
      `/api/v1/user/trivia-list/${id}`,
      options
    ).catch(handleError);

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const viewAfterDelete = view.filter((question) => {
      return question.id !== id;
    });
    setView(viewAfterDelete);
  };

  return (
    <article className="text-center col col-md-3">
      {/* <Card className = 'article-cards font-serif'>
        <h6 className='font-serif'>{question}</h6>
        <Card.Body>
          <p className='font-serif'>{incorrectAnswer1}</p>
          <p className='font-serif'>{incorrectAnswer2}</p>
          <p className='font-serif'>{incorrectAnswer3}</p>
          <p className='font-serif'>Correct Answer = {correctAnswer}</p>

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
          <button className="articleBtn" variant="primary" onClick= {handleShow}>
            Edit
          </button> 
          <br></br>
          {/* <button className="articleBtn2 mt-1" variant="primary" onClick={() => handleDelete(question.id)}>
            Delete
          </button> */}
      <div className=" flex flex-row  justify-center mt-8 ">
        <div className="container rounded-2xl mt-10   pt-10  pb-10">
          <h6 className="font-serif text-white">{question}</h6>

          <p className="font-serif mt-2 text-white">{incorrectAnswer1}</p>
          <p className="font-serif mt-2 text-white">{incorrectAnswer2}</p>
          <p className="font-serif mt-2 text-white">{incorrectAnswer3}</p>
          <p className="font-serif mt-2 text-dark-green">
            Correct Answer = {correctAnswer}
          </p>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body className="myModal">
              <QuestionForm
                question={question}
                incorrectAnswer1={incorrectAnswer1}
                incorrectAnswer2={incorrectAnswer2}
                incorrectAnswer3={incorrectAnswer3}
                correctAnswer={correctAnswer}
                phase={phase}
                id={id}
                questions={questions}
                setQuestions={setQuestions}
                setShow={setShow}
              />
            </Modal.Body>
          </Modal>

          <button
            className="btn h-100% text-white bg-reg-green  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 mt-3 mb-3 text-center"
            variant="primary"
            onClick={handleShow}
          >
            Edit
          </button>
          <br></br>
          {/* <button className="btn articleBtn2 text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 text-center " variant="primary" onClick={handleClose}>
            Delete
          </button> */}
        </div>
      </div>
    </article>
  );
}

function Questions(props) {
  const [questions, setQuestions] = useState(props.questions);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch("/api/v1/user/trivia-list/").catch(
        handleError
      );
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
    <Question
      key={question.id}
      {...question}
      questions={questions}
      setQuestions={setQuestions}
    />
  ));

  return (
    <div className="container content-row">
      <div className="row">{questionList}</div>
    </div>
  );
}

Questions.defaultProps = {
  questions: [],
};

export default Questions;
