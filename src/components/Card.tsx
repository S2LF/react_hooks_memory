import React from 'react';
import './Card.css';

type CardType = {
  card: string | undefined;
  feedback: string;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any;
};

function Card({ card, feedback, index, onClick }: CardType): JSX.Element {
  const HIDDEN_SYMBOL = '❓';

  return (
    <button
      type="button"
      className={`card ${feedback}`}
      onClick={() => onClick(index, feedback)}
      onKeyDown={() => onClick(index, feedback)}
    >
      <span className="symbol">
        {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
      </span>
    </button>
  );
}

export default Card;
