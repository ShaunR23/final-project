import Cookies from "js-cookie";
import { useState } from "react";
import { handleError } from "../utils";

const INITIAL_STATE = {
  question: "",
  incorrectAnswer1: "",
  incorrectAnswer2: "",
  incorrectAnswer3: "",
  correctAnswer: "",
  phase: "",
};

function QuestionForm(props) {
  
  const [phase, setPhase] = useState("");
  const [state, setState] = useState({...props});

  const handleInput = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("question", state.question);
    formData.append("incorrectAnswer1", state.incorrectAnswer1);
    formData.append("incorrectAnswer2", state.incorrectAnswer2);
    formData.append("incorrectAnswer3", state.incorrectAnswer3);
    formData.append("correctAnswer", state.correctAnswer);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };


    await fetch("/api/v1/user/trivia/", options);
    setState({...state, ...INITIAL_STATE });
  };

  const handleUpdate = async (e) => {
    const pk = state.id;

    e.preventDefault();
    const formData = new FormData();
    formData.append("question", state.question);
    formData.append("incorrectAnswer1", state.incorrectAnswer1);
    formData.append("incorrectAnswer2", state.incorrectAnswer2);
    formData.append("incorrectAnswer3", state.incorrectAnswer3);
    formData.append("correctAnswer", state.correctAnswer);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    await fetch(`/api/v1/user/trivia/${pk}`, options.catch(handleError));
  };

  return (
<div className="bg-gray-lighter h-screen font-sans">
    <div className="container mx-auto h-full flex justify-center items-center">
    <div className="w-1/2">
    <form onSubmit= {state.id ? handleUpdate : handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="question"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Question
        </label>
        <input
          type="text"
          id="question"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="question"
          onChange={handleInput}
          value={state.question}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="incorrect-answer1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Incorrect Answer
        </label>
        <input
          type="text"
          id="incorrect-answer1"
          name="incorrectAnswer1"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleInput}
          value={state.incorrectAnswer1}
        />
      </div>
      <div className="mb-4">
        <label
          for="incorrect-answer2"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Incorrect Answer
        </label>
        <input
          type="text"
          id="incorrect-answer2"
          name="incorrectAnswer2"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleInput}
          value={state.incorrectAnswer2}
        />
      </div>
      <div className="mb-4">
        <label
          for="incorrect-answer3"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Incorrect Answer
        </label>
        <input
          type="text"
          id="incorrect-answer3"
          name="incorrectAnswer3"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleInput}
          value={state.incorrectAnswer3}
        />
      </div>
      <div className="mb-6">
        <label
          for="correct-answer"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Correct Answer
        </label>
        <input
          type="text"
          id="correct-answer"
          name="correctAnswer"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleInput}
          value={state.correctAnswer}
        />
      </div>

      
      <button
        type="submit" onClick={() => setPhase("DRAFT")}
        className="text-white bg-dark-green hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 text-center dark:bg-blue dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Save
      </button>

      <button
        type="submit" onClick={() => setPhase("SUBMITTED")}
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

export default QuestionForm
