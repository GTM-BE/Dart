/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

function randomName(): string {
  const data = require('./names.json');
  return data.names[Math.floor(Math.random() * data.names.length)];
}

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
  const [Rounds, setRounds] = useState<number[]>([]);
  const [Shots, setShots] = useState<number>(0);

  useEffect(() => setAverage(calculateAverage(baseScore, Score, Shots)), [Score, Shots]);
  useEffect(() => setShots(Rounds.length * 3), [Rounds]);
  useEffect(() => {
    let base = baseScore;
    Rounds.forEach((shot) => (base = base - shot));
    if (base <= 0) {
      setScore(0);
    } else {
      setScore(base);
    }
  }, [Rounds]);

  function reset(): void {
    setScore(baseScore);
    setRounds([]);
  }

  function generateShotHistory(): JSX.Element[] {
    const scores: JSX.Element[] = [];
    for (let i = 0; i < (Rounds.length < 7 ? 7 : Rounds.length); i++) {
      const fontSize = Math.round((2 - 0.2 * i) * 100) / 100;
      scores.push(
        <input
          key={i}
          type="text"
          className="default-button shadow-md text-4xl text-center w-11/12 h-16 m-1"
          defaultValue={Rounds[i] ?? '---'}
          style={{ fontSize: `${fontSize < 1 ? 1 : fontSize}rem` }}
          onChange={(ev) => {
            while (ev.target.value.startsWith('0') && ev.target.value.length >= 2)
              ev.target.value = ev.target.value.slice(1);
            if (ev.target.value === '') {
              ev.target.value = '0';
            }
            const maxValue = Score < 180 ? Score : 180;
            ev.target.value = Number(ev.target.value) > maxValue ? `${maxValue}` : ev.target.value;
          }}
          onKeyPress={(ev) => {
            console.log(Number.isNaN(Number(ev.key)));
            if (Number.isNaN(Number(ev.key))) {
              ev.preventDefault();
            }
          }}
          onSelect={(ev) => {
            if (ev.target.value === '---') {
              ev.preventDefault();
            }
          }}
        />
      );
    }
    console.log(scores);
    return scores;
  }

  useImperativeHandle(ref, () => ({}));

  return (
    <div className="p-1 grid grid-cols-1 w-full justify-items-center border-l border-r border-b border-gray-700">
      <div className="inline-flex m-1 w-full">
        <button type="button" className="default-button mx-1" onClick={() => reset()}>
          Reset
        </button>
        <input
          type="text"
          className="default-lable text-2xl w-full"
          defaultValue={Name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <button type="button" className="default-button mx-1" onClick={() => RemovePlayer(id)}>
          Remove
        </button>
      </div>{' '}
      <div className="mx-2 my-1 w-full">
        {Score === 0 ? (
          <div className="text-center w-full text-6xl h-36 focus:outline-none outline-none rounded border-b-2 border-gray-700 bg-gray-700 bg-opacity-30">
            Finished
          </div>
        ) : (
          <input
            type="text"
            defaultValue="0"
            className="text-center w-full text-6xl h-36 focus:outline-none outline-none rounded border-b-2 border-gray-700 bg-gray-700 bg-opacity-30"
            onChange={(ev) => {
              if (ev.target.value === '') {
                ev.target.value = '0';
              } else if (ev.target.value.startsWith('0')) {
                ev.target.value = ev.target.value.slice(1);
              }
              const maxValue = Score < 180 ? Score : 180;
              ev.target.value =
                Number(ev.target.value) > maxValue ? `${maxValue}` : ev.target.value;
            }}
            onKeyPress={(ev) => {
              if (Number.isNaN(Number(ev.key))) {
                ev.preventDefault();
              }

              if (ev.key === 'Enter') {
                setRounds([...Rounds, Number(ev.currentTarget.value)]);
                ev.target.value = '0';
              }
            }}
          />
        )}
      </div>
      <div className="bg-gray-700 bg-opacity-30 text-center border-t border-b m-2 overflow-y-hidden">
        {generateShotHistory()}
      </div>
      <div className="text-center">
        <p className="text-5xl">Score: {Score}</p>
        <p className="text-5xl">Average: {Number.isNaN(Average) ? '---' : Average}</p>
        <p className="text-5xl">Round: {Rounds.length}</p>
      </div>
    </div>
  );
});

export default Player;
