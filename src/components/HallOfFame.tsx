import React from 'react';
import './HallOfFame.css';

export type HoFTypes = {
  _id: string;
  guesses: number;
  date: string;
  name: string;
  justNew?: boolean;
};

export type HallOfFameTypes = {
  HoF: Array<HoFTypes>;
};

function HallOfFame({ HoF }: HallOfFameTypes): JSX.Element {
  console.log(HoF);

  // eslint-disable-next-line func-names
  const sorted = HoF.sort(function (
    a: { guesses: number },
    b: { guesses: number }
  ) {
    return a.guesses - b.guesses;
  });
  console.log('sorted', sorted);

  return (
    <>
      <h2 className="title">HighScores</h2>
      <table className="hallOfFame">
        <thead>
          <tr>
            <th>N°</th>
            <th>Score</th>
            <th>Joueur</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {HoF.map(({ _id, guesses, date, name, justNew }, index) => {
            return (
              <tr key={_id} className={justNew ? 'new' : ''}>
                <td>{index + 1}</td>
                <td className="score">{guesses}</td>
                <td className="player">{name}</td>
                <td className="date">{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default HallOfFame;
