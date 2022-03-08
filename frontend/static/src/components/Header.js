import { NavLink } from "react-router-dom";
import App from "./App";

function Header({handleLogout}){
return(
    <>
    <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/login'>Login</NavLink>
            </li>
            <li className='col navLinkButton mx-0'>
                <NavLink className='navLinks' to='/register'>Register</NavLink>
            </li>
        <button onClick={() => handleLogout()}>Logout</button>
    </>
)
}

export default Header