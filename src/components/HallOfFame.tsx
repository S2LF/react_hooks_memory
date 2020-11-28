import React from 'react';
import './HallOfFame.css';

export const FAKE_HOF = [
  { id: 3, guesses: 18, date: '10/10/2017', player: 'Jane' },
  { id: 2, guesses: 23, date: '11/10/2017', player: 'Kevin' },
  { id: 1, guesses: 31, date: '06/10/2017', player: 'Louisa' },
  { id: 0, guesses: 48, date: '14/10/2017', player: 'Marc' },
];

function HallOfFame() {
  return (
    <>
      <h2>HighScores :</h2>
      <table className="hallOfFame">
        <thead>
          <th>N°</th>
          <th>Score</th>
          <th>Joueur</th>
          <th>Date</th>
        </thead>
        <tbody>
          {FAKE_HOF.map(({ id, guesses, date, player }, index) => {
            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td className="score">{guesses}</td>
                <td className="player">{player}</td>
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
