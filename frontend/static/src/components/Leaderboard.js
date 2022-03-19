import { useEffect, useState } from "react";
import { handleError } from "../utils";

function Score ({
score,
score_hard,
user,
username,
scoreList,
scores
}) {
console.log(score)


    

  return( 
    <div className="leaderboard flex flex-row justify-content-center">
    <div className="  overflow-x-auto sm:-mx-6 lg:-mx-8  ">
    <div className=" inline-block py-2 min-w-full sm:px-6 lg:px-8 ">
    <div className="overflow-hidden shadow-md sm:rounded-lg">
    
    <table className=" m-20">
    
    <thead className="bg-gray-50 dark:bg-gray-700">
    <h2 className = "justify-center">Normal</h2>
    <tr>
    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
    Rank
    </th>
    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
    Name
    </th>
    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
    Score
    </th>
    
    </tr>
    </thead>
    <tbody>
    
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    1
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    {user}
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    {score}
    </td>
    </tr>
    
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    2
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    {score}
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    3
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    4
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    5
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    6
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    7
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    8
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    9
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    10
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    White
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Accessories
    </td>
    </tr>
    
    
    </tbody>
    </table>
    </div>
    </div>
    </div>
    
    
    
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8 ">
    <div className="overflow-hidden shadow-md sm:rounded-lg">
    <table className="m-20">
    
    <thead className="bg-gray-50 dark:bg-gray-700">
    <h2 className = "justify-center">Normal</h2>
    <tr>
    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
    Rank
    </th>
    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
    Name
    </th>
    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
    Score
    </th>
    
    </tr>
    </thead>
    <tbody>
    
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    1
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    2
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    3
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    4
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    5
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    6
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    7
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    8
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    9
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Name
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Score
    </td>
    </tr>
    
    <tr className="bg-white dark:bg-gray-800">
    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
    10
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    White
    </td>
    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
    Accessories
    </td>
    </tr>
    
    
    
    
    </tbody>
    </table>
    </div>
    </div>
    </div>
    </div>
    )

}

function Leaderboard(props){

   const [scores, setScores] = useState(props.scores) 

    useEffect(() => {
        const getScores = async () => {
          const response = await fetch("/api/v1/score/").catch(handleError);
          if (!response.ok) {
            throw new Error("Network response was not OK!");
          } else {
            const data = await response.json();
            setScores(data);
          }
        };
        getScores();
      }, []);

      const scoreList = scores.map((score) => (
        <Score key={score.user} {...score} scores = {scores}  />
      ))
console.log(scoreList.score)
    
return( 
<div>{scoreList[0]}</div>
)
}
Leaderboard.defaultProps = {
  scores: [],
};

export default Leaderboard