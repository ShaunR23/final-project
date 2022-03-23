import { useEffect, useState } from "react";
import { handleError } from "../utils";
import Cookies from "js-cookie";

function Board({ title, scores }) {
  const tableRows = scores.map((score, index) => (
    <tr>
      <td className="border px-8 py-4">{index + 1}</td>
      <td className="border px-8 py-4">{score.username}</td>
      <td className="border px-8 py-4">{score.score}</td>
    </tr>
  ));

  return (
    <>
      <h2 className=" flex justify-center text-2xl font-semibold font-serif tex-decoration-line: underline mt-3">
        {title}
      </h2>
      <div className=" flex justify-center mt-3">
        <table className="items-center shadow-lg border-collapse container">
          <tbody>
            <tr>
              <th className=" border text-left px-8 py-4">Rank</th>
              <th className=" border text-left px-8 py-4">User</th>
              <th className=" border text-left px-8 py-4">Score</th>
            </tr>
            {tableRows}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Leaderboard(props) {
  const [scores, setScores] = useState(props.scores);
  const [scoresHard, setScoresHard] = useState(props.scoresHard);

  const getScores = async () => {
    const response = await fetch("/api/v1/leaderboard/", {
      headers: {
        Authorization: Cookies.get("Authorization"),
      },
    }).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK!");
    }
    const data = await response.json();
    setScores(data.top_scores);
    setScoresHard(data.hard_mode_top_scores);
  };

  useEffect(() => {
    getScores();
  }, []);

  return (
    <div>
      <Board title="Normal" scores={scores} />
      <Board title="Hard" scores={scoresHard} />
    </div>
  );
}

Leaderboard.defaultProps = {
  scores: [],
  scoresHard: [],
};

export default Leaderboard;
