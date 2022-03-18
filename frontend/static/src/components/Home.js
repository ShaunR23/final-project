import { NavLink } from "react-router-dom"
function Home(){

    const handleStartNormal = () => {
        setTimeout(() => {
         
        }, 3000);
      };

return(
<div className="flex flex-row justify-center mt-16">
    <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none rounded-2xl h-80 w-72 m-10 hover:shadow-xl dark:hover:shadow-dark">
           
            <div className="flex justify-center pt-12">
                <img
                    // src={require("./playstation.jpeg")} 
                    
                    width="100%"
                    height= '180'
                />
            </div>
            {/* <h2 className="text-gray-800 dark:text-gray-300 font-sans font-medium text-xl pt-8 pl-8">
                Normal Mode
            </h2> */}
            <div className='flex justify-center'>
            <NavLink
                className="navLinks  "
                to="/game"
                href="#"
                className="text-gray-800 dark:text-gray-300 font-sans font-medium text-xl p-20 text-center ">
              
                Normal Mode

                <button
              type="submit"
              onClick
              className="text-white bg-dark-green hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-white dark:focus:ring-blue-800 mt-4 "
            >
              Start Game
            </button>
              </NavLink>
              </div>
              
            
          </div>  
            
        
        {/* <div className="flex flex-row flex-wrap justify-center mt-16"> */}
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none rounded-2xl h-80 w-72 m-10 hover:shadow-xl dark:hover:shadow-dark">
        
            <div className="flex justify-center pt-12">
                <img
                    // src={require("./hard-mode.webp")} 
                    
                    width="100%"
                    height="200"
                />
            </div>
            {/* <h2 className="text-gray-800 dark:text-gray-300 font-sans font-medium text-xl pt-8 pl-8">
                Hard Mode
            </h2> */}
            <div className='flex justify-center'>
            <NavLink
                className="navLinks"
                to="/game-hard"
                href="#"
                className="text-gray-800 dark:text-gray-300 font-sans font-medium text-xl p-20 text-center">
              
                Hard Mode

                <button
              type="submit"
              onClick
              className="text-white bg-dark-green hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4  "
            >
              Start Game

              </button>
              </NavLink>

              </div>

              
            
        </div> 
        </div>
)
} 

export default Home

    