import React from 'react';
import './GuessCount.css';

export type GuessType = {
  guesses: number;
};

function GuessCount({ guesses }: GuessType): JSX.Element {
  return (
    <div className={`guesses ${guesses >= 32 ? `red` : `green`} `}>
      {guesses}
    </div>
  );
}

export default GuessCount;
