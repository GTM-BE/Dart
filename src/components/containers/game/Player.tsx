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
  const [ShotHistory, setShotHistory] = useState<JSX.Element[]>([]);
  const [OrigValue, setOrigValue] = useState<string>('');

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
    setShotHistory([]);
  }

  useEffect(() => {
    const scores = [];
    for (let i = 0; i < (Rounds.length < 7 ? 7 : Rounds.length); i++) {
      const fontSize = Math.round((3 - 0.4 * i) * 100) / 100;

      scores.push(
        <input
          key={i}
          type="text"
          className="default-button shadow-md text-4xl text-center w-11/12 h-16 m-1"
          defaultValue={Rounds[Rounds.length - (i + 1)]}
          style={{ fontSize: `${fontSize < 1.5 ? 1.5 : fontSize}rem` }}
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
            if (i >= Rounds.length) ev.preventDefault();
            if (ev.key === 'Enter') {
              ev.target.blur();
            } else if (Number.isNaN(Number(ev.key)) || ev.key === ' ') {
              ev.preventDefault();
            }
          }}
          onPaste={(e) => {
            if (Number.isNaN(Number(e.clipboardData))) {
              e.preventDefault();
            }
          }}
          onFocus={(ev) => {
            if (i >= Rounds.length) ev.target.blur();
            setOrigValue(ev.target.value);
          }}
          onBlur={(ev) => {
            if (i >= Rounds.length) return;
            if (Number(ev.target.value) === NaN) {
              ev.target.value = OrigValue;
            } else {
              const data = [...Rounds];
              data.splice(i, 1, Number(ev.target.value));
              setRounds(data);
            }
          }}
        />
      );
    }
    setShotHistory(scores);
  }, [Rounds]);

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
      </div>
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
              if (Number.isNaN(Number(ev.key)) || ev.key === ' ') {
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
      <div
        className="bg-gray-700 bg-opacity-30 text-center border-t border-b m-2 overflow-y-scroll"
        style={{ height: 'calc(100vh - 450px)' }}
      >
        {ShotHistory}
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
