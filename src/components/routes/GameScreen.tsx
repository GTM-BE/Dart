import Menu from 'Container/base/Menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function GameScreen() {
  const [CustomScore, setCustomScore] = useState<number>(0);

  return (
    <Menu title="Game" subTitle="select game type">
      <Link to="/game_501" className="default-button text-center m-1 w-64">
        501
      </Link>
      <Link to="/game_201" className="default-button text-center m-1 w-64">
        201
      </Link>
      <div className="inline-flex min-w-1/4 m-1">
        <input
          type="number"
          defaultValue="0"
          onChange={(e) => setCustomScore(Number(e.target.value))}
          className="rounded focus:outline-none text-center bg-gray-700 hover:bg-gray-600 pl-1 w-48"
        />
        <Link to={`/game_${CustomScore * 1}`} className="default-button ml-1 text-center w-16">
          Submit
        </Link>
      </div>
      <Link to="/home" className="default-button text-center m-1 w-64">
        Back
      </Link>
    </Menu>
  );
}

export default GameScreen;
