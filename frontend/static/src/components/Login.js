import Cookies from "js-cookie";
import { useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const INITIAL_STATE = {
  username: "",
  password: "",
};
function Login() {
  const { navigate, setAuth, setAdmin } = useOutletContext();
  let [searchParams] = useSearchParams();

  const [state, setState] = useState(INITIAL_STATE);

  const handleInput = (event) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (err) => {
    console.log(err);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSFRToken": Cookies.get("csfrtoken"),
      },
      body: JSON.stringify(state),
    };

    const response = await fetch("/rest-auth/login/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Network response no ok!");
    }

    const data = await response.json();
    Cookies.set("Authorization", `Token ${data.key}`);
    setAuth(true);
    setAdmin(data.is_superuser);
    setState(INITIAL_STATE);
    navigate("/game", { replace: true });
  };

  const twitterAuth = async () => {
    const response = await fetch("/api/v1/twitter/request_token/", {
      method: "GET",
    });

    const json = await response.json();
    const oauth_token = json["oauth_token"];
    window.location.replace(
      `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`
    );
  };

  const twitterReceiveCallback = async () => {
    const oauth_token = searchParams.get("oauth_token");
    const oauth_verifier = searchParams.get("oauth_verifier");

    const response = await fetch(
      `/api/v1/twitter/login/callback/?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`,
      {
        method: "GET",
      }
    );

    console.log("response", response);
    if (!response.ok) {
      throw new Error("Something went wrong!");
      return;
    }

    const data = await response.json();
    console.log("twitter auth data", data);
    Cookies.set("Authorization", `Token ${data.key}`);
    setAuth(true);
    setAdmin(data.is_superuser);
    setState(INITIAL_STATE);
    navigate("/game", { replace: true });
  };

  const oauth_token = searchParams.get("oauth_token");

  if (oauth_token) {
    twitterReceiveCallback();

    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="bg-gray-lighter h-screen font-sans">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="">
          <h1 className="font-hairline mb-6 text-center text-dark-green">
            Login to Press Start Trivia
          </h1>
          <form
            onSubmit={handleSubmit}
            className="border-dark-green p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <label
                htmlFor="username"
                className="font-bold text-dark-green block mb-2"
              >
                Username
              </label>
              <input
                type="text"
                className="inputField"
                name="username"
                id="username"
                placeholder="username"
                onChange={handleInput}
                required
                value={state.username}
                className="block appearance-none w-full bg-white border border-gray-light hover:border-gray px-2 py-2 rounded shadow"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="font-bold text-dark-green block mb-2"
              >
                Password
              </label>
              <input
                type="password"
                className="inputField"
                name="password"
                id="password"
                placeholder="password"
                onChange={handleInput}
                required
                value={state.password}
                className="block appearance-none w-full bg-white border border-gray-light hover:border-gray px-2 py-2 rounded shadow"
              />
            </div>

            <div className="flex justify-center">
              <button
                id="login-submit"
                type="submit"
                className="text-dark-green font-bold py-2 px-4 mr-3 rounded border border-dark-green"
              >
                Login
              </button>

              <button
                className="text-dark-green font-bold py-2 px-4 rounded border border-dark-green"
                type="button"
                onClick={twitterAuth}
              >
                Sign in with Twitter
              </button>

              {/* <a
                className="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right"
                href="#"
              >
                Forgot Password?
              </a> */}
            </div>
          </form>
          <div className="text-center">
            <p className="text-gray-dark">
              Don't have an account? &nbsp;
              <a href="#" className="underline text-white font-bold">
                Create an Account
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
