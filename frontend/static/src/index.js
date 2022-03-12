import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'flowbite';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Login from "./components/Login";
import Register from "./components/Register";
import Questions from './components/Questions';
import QuestionForm from './components/QuestionForm';
import AdminView from './components/AdminView';
import Game from './components/Game';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="question-form" element={<QuestionForm />} />
        <Route path="question-list" element={<Questions />} />
        <Route path="admin" element={<AdminView />} />
        <Route path="game" element={<Game />} />
        <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
