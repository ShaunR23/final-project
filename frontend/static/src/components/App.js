import React from 'react';
import Login from './Login';
import Register from './Register.js'
import Header from './Header.js'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
function App(handleError) {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(null);
  const [isAdmin, setAdmin] = useState(null);

    const checkAuth = async () => {
      const response = await fetch("/rest-auth/user/");
      if (!response.ok) {
        setAuth(false);
        return;
      }
      const data = await response.json();
      setAuth(true);
      setAdmin(data.is_superuser);
    };
  
    useEffect(() => {
      setTimeout(checkAuth, 500);
    }, []);
  
    const handleLogout = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };
  
      const response = await fetch("/rest-auth/logout/", options).catch(
        handleError
      );
  
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
  
      setAuth(false);
      Cookies.remove("Authorization");
    };
  

  return (
    <>
   <Header handleLogout={handleLogout} />
    <Outlet />
    </>
    
  );
}

export default App;
