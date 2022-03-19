import { NavLink } from "react-router-dom"
function Home(){


return(
    <>
<div className="flex flex-column justify-center mt-10 ">
    <div className="container home1 dark:bg-gray-800 shadow-lg dark:shadow-none rounded-2xl ml mt-10 hover:shadow-xl dark:hover:shadow-dark ">
           
            <div className="flex justify-center pt-12">
                
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
                <br></br>
                <button
              type="submit"
              onClick
              className="p-4 text-white bg-reg-green  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-white dark:focus:ring-blue-800 mt-4 "
            >
              Start Game
            </button>
              </NavLink>
              </div>
              
            
          </div>  
            
        
        {/* <div className="flex flex-row flex-wrap justify-center mt-16"> */}
        <div className="container home1 dark:bg-gray-800 shadow-lg dark:shadow-none rounded-2xl  w-screen mt-10 mb-10  hover:shadow-xl dark:hover:shadow-dark ">
            <div className="flex justify-center pt-12">
                
            </div>
            {/* <h2 className="text-gray-800 dark:text-gray-300 font-sans font-medium text-xl pt-8 pl-8">
                Hard Mode
            </h2> */}
            <div className='flex justify-center'>
            <NavLink
                className="navLinks"
                to="/game-hard"
                href="#"
                className="text-gray-800 dark:text-gray-300 font-sans font-medium text-xl p-20 text-center ">
              
                Hard Mode
                <br></br>
                <button
              type="submit"
              onClick
              className="p-4 text-white bg-reg-green hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4  "
            >
              Start Game

              </button>
              </NavLink>

              </div>

              
            
        </div> 
        </div>

        
      </>
)
} 

export default Home

    