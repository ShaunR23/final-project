import { useEffect, useState } from "react";
import { handleError } from "../utils";

function Score(props, { user, score,}) {
  const [scores, setScores] = useState(props.scores);
 
  
  console.log(scores[1].score);
  
  

  const sortedScoresHard = scores.sort((a, b) => {
    return b.score_hard - a.score_hard;
  });

  const sortedScores = scores.sort((a, b) => {
    return b.score - a.score;
  });

  console.log(sortedScores);
  return (
    <>
      <div></div>
      <h2 className=" flex justify-center text-2xl font-semibold font-serif tex-decoration-line: underline mt-3">
        Normal
      </h2>
      <div className=" flex justify-center mt-3">
        <table className="items-center shadow-lg border-collapse container">
          <tr>
            <th className=" border text-left px-8 py-4">Rank</th>
            <th className=" border text-left px-8 py-4">User</th>
            <th className=" border text-left px-8 py-4">Score</th>
          </tr>
          <tr>
            <td className="border px-8 py-4">1</td>
            <td className="border px-8 py-4">{sortedScores[0].user}</td>
            <td className="border px-8 py-4">{sortedScores[0].score}</td>
          </tr>
          <tr>
            <td className="border px-8 py-4">2</td>
            <td className="border px-8 py-4">{sortedScores[1].user}</td>
            <td className="border px-8 py-4">{sortedScores[1].score}</td>
          </tr>
          <tr>
            <td className="border px-8 py-4">3</td>
            <td className="border px-8 py-4">{sortedScores[1].user}</td>
            <td className="border px-8 py-4">{sortedScores[1].score}</td>
          </tr>
          <tr>
            <td className="border px-8 py-4">4</td>
            <td className="border px-8 py-4">{sortedScores[1].user}</td>
            <td className="border px-8 py-4">{sortedScores[1].score}</td>
          </tr>
          <tr>
            <td className="border px-8 py-4">5</td>
            <td className="border px-8 py-4">{sortedScores[1].user}</td>
            <td className="border px-8 py-4">{sortedScores[1].score}</td>
          </tr>
        </table>
      </div>

      <h2 className="flex justify-center text-2xl font-semibold font-serif tex-decoration-line: underline mt-3">
        Survivor
      </h2>
      <div className="flex justify-center mt-3">
        <table className="items-center shadow-lg border-collapse container">
          <tr>
            <th className=" border text-left px-8 py-4">Rank</th>
            <th className=" border text-left px-8 py-4">User</th>
            <th className=" border text-left px-8 py-4">Score</th>
          </tr>
          <tr>
            <td className="border px-8 py-4">1</td>
            <td className="border px-8 py-4">{sortedScoresHard[0].user}</td>
            <td className="border px-8 py-4">
              {sortedScoresHard[0].score_hard}
            </td>
          </tr>
          <tr>
            <td className="border px-8 py-4">2</td>
            <td className="border px-8 py-4">{sortedScoresHard[1].user}</td>
            <td className="border px-8 py-4">
              {sortedScoresHard[1].score_hard}
            </td>
          </tr>
          <tr>
            <td className="border px-8 py-4">3</td>
            <td className="border px-8 py-4">{sortedScoresHard[1].user}</td>
            <td className="border px-8 py-4">
              {sortedScoresHard[1].score_hard}
            </td>
          </tr>
          <tr>
            <td className="border px-8 py-4">4</td>
            <td className="border px-8 py-4">{sortedScoresHard[1].user}</td>
            <td className="border px-8 py-4">
              {sortedScoresHard[1].score_hard}
            </td>
          </tr>
          <tr>
            <td className="border px-8 py-4">5</td>
            <td className="border px-8 py-4">{sortedScoresHard[1].user}</td>
            <td className="border px-8 py-4">
              {sortedScoresHard[1].score_hard}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

function Leaderboard(props) {
  const [scores, setScores] = useState(props.scores);
  const [questions, setQuestions] = useState(props.questions);
  const [scoresHard, setScoresHard] = useState(props.scores);
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

  useEffect(() => {
    const getScoresHard = async () => {
      const response = await fetch("/api/v1/score/").catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not OK!");
      } else {
        const data = await response.json();
        setScoresHard(data);
      }
    };
    getScoresHard();
  }, []);

  

  const scoreList = scores.map((score) => (
    <Score key={score.user} {...score} scores={scores} />
  ));

  console.log({ scores });
  return <div>{scoreList[0]}</div>;
}
Leaderboard.defaultProps = {
  scores: [],
  
};

export default Leaderboard;
