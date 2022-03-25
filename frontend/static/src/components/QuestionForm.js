import Cookies from "js-cookie";
import { useState } from "react";
import { handleError } from "../utils";
import AdminView from "./AdminView";
import Questions from "./Questions";

const INITIAL_STATE = {
  question: "",
  incorrectAnswer1: "",
  incorrectAnswer2: "",
  incorrectAnswer3: "",
  correctAnswer: "",
  phase: "",
};

function QuestionForm(props) {
  const [phase, setPhase] = useState("state.phase");
  const [state, setState] = useState({ ...props });
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  

  const handleInput = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
      
    }));
  };
  

  const handleSave = async (e) => {
    const data = { ...state, phase: e.target.value };
    let url = "/api/v1/user/trivia-list/";
    let method = "POST";

    if (data.id) {
      url = url + `${data.id}/`;
      method = "PUT";
      delete data.id;
    }

    const options = {
      method,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
        Authorization: Cookies.get("Authorization"),
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    const json = await response.json();
    setState({ ...state, ...INITIAL_STATE });
    console.log(response);

    if (json.phase === "SUBMITTED") {
      const updatedQuestions = [...props.questions];
      const index = updatedQuestions.findIndex(
        (question) => question.id === json.id
      );
      updatedQuestions.splice(index, 1);
      props.setQuestions(updatedQuestions);
    } else if (method === "POST") {
      props.setQuestions([...props.questions, json]);
    } else if ((method = "PUT")) {
      const updatedQuestions = [...props.questions];
      const index = updatedQuestions.findIndex(
        (question) => question.id === json.id
      );
      updatedQuestions[index] = json;
      props.setQuestions(updatedQuestions);
    }
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   console.log("event", e);
  //   const data = { ...state };
  //   delete data.id;

  //   // const formData = new FormData();
  //   // formData.append("question", state.question);
  //   // formData.append("incorrectAnswer1", state.incorrectAnswer1);
  //   // formData.append("incorrectAnswer2", state.incorrectAnswer2);
  //   // formData.append("incorrectAnswer3", state.incorrectAnswer3);
  //   // formData.append("correctAnswer", state.correctAnswer);

  //   // const options = {
  //   //   method: "PUT",
  //   //   headers: {
  //   //     "X-CSRFToken": Cookies.get("csrftoken"),
  //   //     Authorization: Cookies.get("Authorization"),
  //   //   },
  //   //   body: formData,
  //   // };
  //   // state.phase = "SUBMIT";
  //   // await fetch(
  //   //   `/api/v1/user/trivia-list/${state.id}/`,
  //   //   options.catch(handleError)
  //   // );
  // };

  return (
    <div className="h-screen ">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="">
          <form>
            <div className="mb-4">
              <label
                htmlFor="question"
                className="block mb-2  text-gray-900 dark:text-gray-300"
              >
                Question
              </label>
              <input
                type="text"
                id="question"
                name="question"
                className="shadow-sm bg-gray-50 border border-dark text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                
                onChange={handleInput}
                value={state.question}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="incorrect-answer1"
                className="block mb-2  "
              >
                Incorrect Answer
              </label>
              <input
                type="text"
                id="incorrect-answer1"
                name="incorrectAnswer1"
                className="shadow-sm bg-gray-50 border-dark border   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                onChange={handleInput}
                value={state.incorrectAnswer1}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="incorrect-answer2"
                className="block mb-2 text-gray-900 dark:text-gray-300"
              >
                Incorrect Answer
              </label>
              <input
                type="text"
                id="incorrect-answer2"
                name="incorrectAnswer2"
                className="shadow-sm bg-gray-50 border border-dark text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                onChange={handleInput}
                value={state.incorrectAnswer2}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="incorrect-answer3"
                className="block mb-2 text-gray-900 dark:text-gray-300"
              >
                Incorrect Answer
              </label>
              <input
                type="text"
                id="incorrect-answer3"
                name="incorrectAnswer3"
                className="shadow-sm bg-gray-50 border border-dark text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                onChange={handleInput}
                value={state.incorrectAnswer3}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="correct-answer"
                className="block mb-2  text-gray-900 dark:text-gray-300"
              >
                Correct Answer
              </label>
              <input
                type="text"
                id="correct-answer"
                name="correctAnswer"
                className="shadow-sm bg-gray-50 border border-dark text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                onChange={handleInput}
                value={state.correctAnswer}
              />
            </div>

            <button
              type="button"
              onClick={()=> {handleSave() ; handleClose()}}
              value="DRAFT"
              data-dismiss="myModal"
              className="text-white bg-dark-green  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 text-center dark:bg-blue dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>

            <button
              type="button"
              value="SUBMITTED"
              onClick={handleSave}
              className="text-white bg-dark-green hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;
