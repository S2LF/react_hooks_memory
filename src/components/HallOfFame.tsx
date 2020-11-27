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
        <tbody>
          {FAKE_HOF.map(({ id, guesses, date, player }) => {
            return (
              <tr key={id}>
                <td className="date">{date}</td>
                <td className="score">{guesses}</td>
                <td className="player">{player}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default HallOfFame;
