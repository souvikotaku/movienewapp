import React from "react";
import "../styles/Leaderboard.css";

const Leaderboard = ({ cast }) => {
  // Create a ranking based on the order of appearance in the cast array
  const rankedCast = cast.map((actor, index) => ({
    name: actor,
    rank: index + 1, // Rank starts at 1
  }));

  return (
    <div className="leaderboard">
      <h3>Cast</h3>
      <ul>
        {rankedCast.map(({ name, rank }) => (
          <li key={rank}>
            {rank}. {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
