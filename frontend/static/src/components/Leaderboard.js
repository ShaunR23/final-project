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
<>
<div></div>
<h2 className='flex justify-center text-2xl font-semibold font-serif tex-decoration-line: underline mt-3'>Normal</h2>
<div className='flex justify-center mt-3'>

<table className="items-center shadow-lg border-collapse container">
  <tr>
    <th className=" border text-left px-8 py-4">Rank</th>
    <th className=" border text-left px-8 py-4">User</th>
    <th className=" border text-left px-8 py-4">Score</th>
  </tr>
  <tr>
    <td className="border px-8 py-4">1</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">2</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">3</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">4</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">5</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">6</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">7</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">8</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">9</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">10</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  </table>
</div>

<h2 className='flex justify-center text-2xl font-semibold font-serif tex-decoration-line: underline mt-3'>Survivor</h2>
<div className='flex justify-center mt-3'>

<table className="items-center shadow-lg border-collapse container">
  <tr>
    <th className=" border text-left px-8 py-4">Rank</th>
    <th className=" border text-left px-8 py-4">User</th>
    <th className=" border text-left px-8 py-4">Score</th>
  </tr>
  <tr>
    <td className="border px-8 py-4">1</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">2</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">3</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">4</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">5</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">6</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">7</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">8</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">9</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">10</td>
    <td className="border px-8 py-4">{user}</td>
    <td className="border px-8 py-4">{score}</td>
  </tr>
  </table>
</div>
   
   </>
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