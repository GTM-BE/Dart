import Player from 'Container/game/Player';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';

// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function Game() {
  const { baseScore } = useParams<{ baseScore: string }>();
  const [Players, setPlayers] = useState<string[]>([]);
  // const [FocusIndex, setFocusIndex] = useState<number>(0);

  function AddPlayer(): void {
    if (Players.length < 4) setPlayers([...Players, uuidv4()]);
  }

  function RemovePlayer(id: string): void {
    setPlayers(Players.filter((pl) => pl !== id));
  }

  useEffect(() => {
    AddPlayer();
  }, []);

  return Number.isNaN(Number(baseScore)) ? (
    <Redirect to="/" />
  ) : (
    <div>
      <div className="flex flex-row p-2 bg-white bg-opacity-5">
        <button
          type="button"
          className="default-button min-w-30 mx-0.5 mr-auto"
          onClick={AddPlayer}
        >
          Add player
        </button>
        <div className="default-lable min-w-1/4">Inital Score: {baseScore}</div>
        <Link to="/home" className="default-button min-w-30 mx-0.5 ml-auto text-center">
          Back
        </Link>
      </div>
      <hr className="border-gray-400" />
      <div className="flex flex-row p-0 bottom-0 left-0 right-0 top-10 absolute">
        {Players.map((pl) => (
          <Player key={pl} id={pl} RemovePlayer={RemovePlayer} baseScore={Number(baseScore)} />
        ))}
      </div>
    </div>
  );
}

export default Game;
