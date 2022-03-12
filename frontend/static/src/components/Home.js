import { NavLink } from "react-router-dom"
function Home(){

return(
<div className="flex flex-row justify-center mt-16">
    <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none rounded-2xl h-80 w-72 m-10 hover:shadow-xl dark:hover:shadow-dark">
           
            <div className="flex justify-center pt-12">
                <img
                    src={require("./playstation.jpeg")} 
                    
                    width="100%"
                    height= '180'
                />
            </div>
            {/* <h2 className="text-gray-800 dark:text-gray-300 font-sans font-medium text-xl pt-8 pl-8">
                Normal Mode
            </h2> */}
            <NavLink
                className="navLinks"
                to="/game"
                href="#"
                className="text-gray-800 dark:text-gray-300 font-sans font-medium text-xl pt-8 pl-8">
              
                Normal Mode
              </NavLink>
            
          </div>  
        
        {/* <div className="flex flex-row flex-wrap justify-center mt-16"> */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none rounded-2xl h-80 w-72 m-10 hover:shadow-xl dark:hover:shadow-dark">
        
            <div className="flex justify-center pt-12">
                <img
                    src={require("./hard-mode.webp")} 
                    
                    width="100%"
                    height="200"
                />
            </div>
            {/* <h2 className="text-gray-800 dark:text-gray-300 font-sans font-medium text-xl pt-8 pl-8">
                Hard Mode
            </h2> */}
            <NavLink
                className="navLinks"
                to="/"
                href="#"
                className="text-gray-800 dark:text-gray-300 font-sans font-medium text-xl pt-8 pl-8">
              
                Hard Mode
              </NavLink>
            
        </div> 
        </div>
)
} 

export default Home

    