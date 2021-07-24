import Player from 'Container/game/Player';
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';

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

  const history = useHistory();

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
        <button type="button" className="default-button mx-0.5 mr-auto" onClick={AddPlayer}>
          Add player
        </button>
        <div className="default-lable min-w-1/4">Inital Score: {baseScore}</div>
        <button
          type="button"
          className="default-button mx-0.5 ml-auto"
          onClick={() => history.push('/home')}
        >
          Add player
        </button>
      </div>
      <hr className="border-gray-400 w-full h-full" />
      <div className="flex flex-row p-0">
        {Players.map((pl) => (
          <Player key={pl} id={pl} RemovePlayer={RemovePlayer} baseScore={Number(baseScore)} />
        ))}
      </div>
    </div>
  );
}

export default Game;
