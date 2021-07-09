/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

function randomName(): string {
  const data = require('./names.json');
  return data.names[Math.floor(Math.random() * data.names.length)];
}

/*
 * calculate avr
 * ((Score left – 501) / Number of darts thrown) * 3 = Darts average
 */

function calculateAverage(initalScore: number, scoreLeft: number, thrownDarts: number) {
  return Math.floor(((initalScore - scoreLeft) / thrownDarts) * 3) * 1;
}

interface Props {
  id: string;
  baseScore: number;
  RemovePlayer: (id: string) => void;
}

// eslint-disable-next-line react/display-name
const Player = forwardRef((props: Props, ref) => {
  const { baseScore, RemovePlayer, id } = props;

  const [Name, setName] = useState<string>(randomName);
  const [Score, setScore] = useState<number>(baseScore);
  const [Average, setAverage] = useState<number>(NaN);
  const [Shots, setShots] = useState<number[]>([]);

  useEffect(() => {
    setAverage(calculateAverage(baseScore, Score, Shots.length));
  }, [Score]);

  useEffect(() => {
    let base = baseScore;
    Shots.forEach((shot) => (base = base - shot));
    if (base <= 0) {
      // TODO: RUN FINISH FUNCTION
      setScore(0);
    } else {
      setScore(base);
    }
  }, [Shots]);

  function reset(): void {
    setScore(baseScore);
    setShots([]);
  }

  useImperativeHandle(ref, () => ({}));

  return (
    <div className="flex flex-col justify-items-center border-l border-r border-b border-gray-700 w-full">
      <div className="inline-flex m-1">
        <button type="button" className="default-button min-w-0 w-20 mr-1" onClick={() => reset()}>
          Reset
        </button>
        <input
          type="text"
          className="default-lable text-2xl w-full"
          defaultValue={Name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <button
          type="button"
          className="default-button min-w-0 w-20 ml-1"
          onClick={() => RemovePlayer(id)}
        >
          Remove
        </button>
      </div>

      <div className="mx-2 my-1">
        {Score === 0 ? (
          <div className="text-center text-4xl w-full h-24 focus:outline-none rounded border-b-2 border-gray-700 bg-gray-700 bg-opacity-30 outline-none">
            Finished
          </div>
        ) : (
          <input
            type="text"
            defaultValue="0"
            className="text-center text-4xl w-full h-24 focus:outline-none rounded border-b-2 border-gray-700 bg-gray-700 bg-opacity-30 outline-none"
            onChange={(ev) => {
              if (ev.target.value === '') {
                ev.target.value = '0';
              } else if (ev.target.value.startsWith('0')) {
                ev.target.value = ev.target.value.slice(1);
              }
              ev.target.value = Number(ev.target.value) > 180 ? '180' : ev.target.value;
            }}
            onKeyPress={(ev) => {
              if (Number.isNaN(Number(ev.key))) {
                ev.preventDefault();
              }

              if (ev.key === 'Enter') {
                setShots([...Shots, Number(ev.currentTarget.value)]);
                ev.target.value = '0';
              }
            }}
          />
        )}
      </div>
      <div className="text-center bg-gray-700 bg-opacity-30 border-t border-b m-2">
        <p className="text-4xl">{Shots[Shots.length - 1] ?? '---'}</p>
        <p className="text-3xl">{Shots[Shots.length - 2] ?? '---'}</p>
        <p className="text-3xl">{Shots[Shots.length - 3] ?? '---'}</p>
        <p className="text-2xl">{Shots[Shots.length - 4] ?? '---'}</p>
        <p className="text-2xl">{Shots[Shots.length - 5] ?? '---'}</p>
        <p className="text-xl">{Shots[Shots.length - 6] ?? '---'}</p>
        <p className="text-xl">{Shots[Shots.length - 7] ?? '---'}</p>
      </div>
      <div className="text-center">
        <p className="text-2xl">Score: {Score}</p>
        <p className="text-2xl">Average: {Number.isNaN(Average) ? '---' : Average}</p>
        <p className="text-2xl">Shots: {Shots.length}</p>
      </div>
    </div>
  );
});

export default Player;
