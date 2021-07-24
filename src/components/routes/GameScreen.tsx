import Menu from 'Container/base/Menu';
import MenuLabel from 'Container/base/MenuLabel';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function GameScreen() {
  const [CustomScore, setCustomScore] = useState<number>(0);

  return (
    <Menu title="Game" subTitle="select game type">
      <MenuLabel title="Default game" />
      <Link to="/game_501" className="default-button text-center m-1 p-1">
        501
      </Link>
      <Link to="/game_201" className="default-button text-center m-1 p-1">
        201
      </Link>
      <MenuLabel title="Custom game" />
      <input
        type="number"
        defaultValue="0"
        onChange={(e) => {
          while (e.target.value.startsWith('0') && e.target.value.length >= 2)
            e.target.value = e.target.value.slice(1);
          if (e.target.value === '') {
            e.target.value = '0';
          }
          setCustomScore(Number(e.target.value));
        }}
        className="default-button focus:outline-none text-center m-1 p-1 w-1/4"
      />
      <Link to={`/game_${CustomScore * 1}`} className="default-button text-center m-1 p-1">
        Submit
      </Link>
      <Link to="/home" className="default-button text-center m-1 mt-10 p-1">
        Back
      </Link>
    </Menu>
  );
}

export default GameScreen;
