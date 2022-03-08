import Cookies from "js-cookie";
import { useState } from "react";


function Register(props){
   
    const [state, setState] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
      });
    
      const handleInput = (e) => {
        const { name, value } = e.target;
    
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
    
        if (state.password1 !== state.password2) {
          alert("Passwords do not match!!");
        }
    
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
          body: JSON.stringify(state),
        };
    
        const response = await fetch("/rest-auth/registration/", options).catch(
          handleError
        );
    
        if (!response.ok) {
          throw new Error("Network response not ok!");
        } else {
          const data = await response.json();
          Cookies.set("Authorization", `Token ${data.key}`);
          props.setAuth(true);
          setState({
            username: "",
            email: "",
            password1: "",
            password2: "",
          });
        }
      };



    return(
    <div className="bg-gray-lighter h-screen font-sans">
    <div className="container mx-auto h-full flex justify-center items-center">
    
        <div className="w-1/3">
            <h1 className="font-hairline mb-6 text-center">Login to Press Start Trivia</h1>
            <form onSubmit={handleSubmit} className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="font-bold text-gray-darker block mb-2">Choose a Username</label>
                    <input className='inputField' type='text' name='username' id='username' onChange={handleInput} required value={state.username} placeholder="Your Username" className="block appearance-none w-full bg-white border border-gray-light hover:border-gray px-2 py-2 rounded shadow" />
                </div>
                <div className="mb-4">
                    <label className="font-bold text-gray-darker block mb-2">Email</label>
                    <input className='inputField' type='email' name='email' id='email' onChange={handleInput} required value={state.email} placeholder="Your Email" className="block appearance-none w-full bg-white border border-gray-light hover:border-gray px-2 py-2 rounded shadow" />
                </div>


                <div className="mb-4">
                    <label className="font-bold text-gray-darker block mb-2">Choose your Password</label>
                    <input className='inputField' type='password' name='password1' id='password' onChange={handleInput} required value={state.password1} placeholder="Enter a Password" className="block appearance-none w-full bg-white border border-gray-light hover:border-gray px-2 py-2 rounded shadow" />
                </div>

                <div className="mb-4">
                    <label className="font-bold text-gray-darker block mb-2">Type Password Again</label>
                    <input className='inputField' type='password' name='password2' id='password' onChange={handleInput} required value={state.password2} placeholder="Confirm Password" className="block appearance-none w-full bg-white border border-gray-light hover:border-gray px-2 py-2 rounded shadow" />
                </div>


                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded">
                        Create Account
                    </button>

                    <a className="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark float-right" href="#">
                        Already Registered? 
                        Login Here!!
                    </a>
                </div>
                
            </form>
            {/* <div class="text-center">
                <p class="text-gray-dark text-sm">Don't have an account? <a href="#" class="no-underline text-blue font-bold">Create an Account</a>.</p>
            </div> */}
        </div>
    {/* </form> */}
    </div>
</div>




    )
}



export default Register