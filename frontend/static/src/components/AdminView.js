import { useState, useEffect } from "react";
import { handleError } from "../utils";
import { Card, Button, Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import QuestionForm from "./QuestionForm";

function AdminView(props) {
  const [questions, setQuestions] = useState(props.questions);
  const [view, setView] = useState(null);

  // const [state, setState] = useState({ ...props });

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch("/api/v1/admin-view/").catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not OK!");
      } else {
        const data = await response.json();
        setQuestions(data);
      }
    };
    getQuestions();
  }, []);

  const publishQuestion = async (e, id) => {
    const data = { ...props, phase: e.target.value };

    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(`/api/v1/admin-view/${id}`, options);
    const json = await response.json();

    const updatedQuestions = [...questions];
    const index = updatedQuestions.findIndex((question) => question.id === id);

    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleDelete = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch(`/api/v1/admin-view/${id}`, options).catch(
      handleError
    );
    // const json = await response.json();

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const updatedQuestions = [...questions];
    const index = updatedQuestions.findIndex((question) => question.id === id);

    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);

    // const viewAfterDelete = view.filter((question) => {
    //   return question.id !== id;
    // });
    // setView(viewAfterDelete);
  };

  const questionList = questions.map((question) => (
    <article className=" text-center col col-md-3 " key={question.id}>
      <div className=" flex flex-row  justify-center mt-8 ">
        <div className="container rounded-2xl mt-10   pt-10  pb-10">
          <h6 className="font-serif text-white">{question.question}</h6>

          <p className="font-serif mt-2 text-white">
            {question.incorrectAnswer1}
          </p>
          <p className="font-serif mt-2 text-white">
            {question.incorrectAnswer2}
          </p>
          <p className="font-serif mt-2 text-white">
            {question.incorrectAnswer3}
          </p>
          <p className="font-serif mt-2 text-dark-green">
            Correct Answer = {question.correctAnswer}
          </p>

          <button
            className="h-100% text-white bg-reg-green  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 mt-3 mb-3 text-center"
            variant="primary"
            name="accept"
            type="submit"
            value="ACCEPTED"
            onClick={(e) => publishQuestion(e, question.id)}
          >
            Accept
          </button>
          <br></br>
          <button
            className="articleBtn2 text-white bg-reg-red  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 text-center"
            variant="primary"
            name="delete"
            type="submit"
            onClick={() => handleDelete(question.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  ));

  return (
    <div className="container content-row">
      <div className="row">{questionList}</div>
    </div>
  );
}

AdminView.defaultProps = {
  questions: [],
};

export default AdminView;
