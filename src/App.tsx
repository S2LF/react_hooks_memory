import React, { useEffect, useState } from 'react';
import shuffle from 'lodash.shuffle';
import './App.css';
import Axios from 'axios';
import Card from './components/Card';
import GuessCount from './components/GuessCount';
import HallOfFame, { HoFTypes } from './components/HallOfFame';
import HoFInput from './components/HoFInput';

function App(): JSX.Element {
  const SIDE = 6;
  const VISUAL_PAUSE_MSECS = 750;
  const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿';

  const [guesses, setGuesses] = useState(0);
  const [currentPair, setCurrentPair] = useState<number[]>([]);
  const [matchCardIndices, setMatchCardIndices] = useState<number[]>([]);
  const [hallOfFame, setHallOfFame] = useState<HoFTypes[]>([]);

  function generateCard() {
    const result = [];
    const size = SIDE * SIDE;
    const candidates = shuffle(SYMBOLS);
    while (result.length < size) {
      const card = candidates.pop();
      result.push(card, card);
    }
    return shuffle(result);
  }

  const [cards, setCards] = useState(generateCard());

  function handleNewPairClosedBy(index: number) {
    const newPair = [currentPair[0], index];
    const newGuesses = guesses + 1;
    const matched = cards[newPair[0]] === cards[newPair[1]];

    setCurrentPair(newPair);
    setGuesses(newGuesses);

    if (matched) {
      setMatchCardIndices([...matchCardIndices, ...newPair]);
    }
    setTimeout(() => setCurrentPair([]), VISUAL_PAUSE_MSECS);
  }

  function handleCardClick(index: number, feedback: string) {
    console.log('click', index, feedback);

    if (currentPair.length === 2 || feedback === 'visible') {
      return;
    }

    if (currentPair.length === 0) {
      setCurrentPair([index]);
      return;
    }

    handleNewPairClosedBy(index);
  }

  function getFeedbackForCard(index: number) {
    const indexMatched = matchCardIndices.includes(index);

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden';
    }

    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched';
    }

    return indexMatched ? 'visible' : 'hidden';
  }

  const won = matchCardIndices.length === cards.length;

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const result = await Axios(
          `${process.env.REACT_APP_API_CALL}/api/memories`
        );
        setHallOfFame(result.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMemories();
  }, []);

  function restartGame(new_scored: HoFTypes) {
    setCards(generateCard());
    setGuesses(0);
    setMatchCardIndices([]);
    setHallOfFame([{ ...new_scored, justNew: true }, ...hallOfFame]);
  }

  return (
    <>
      <h1 className="title">Memory {process.env.REACT_APP_API_CALL}</h1>
      <div className="game">
        <main>
          <GuessCount guesses={guesses} />
          <div className="memory">
            {cards.map((card, index) => (
              <Card
                card={card}
                feedback={getFeedbackForCard(index)}
                onClick={handleCardClick}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                index={index}
              />
            ))}
            {won && (
              <HoFInput
                guesses={guesses}
                onSuccess={(new_scored: HoFTypes) => {
                  restartGame(new_scored);
                }}
              />
            )}
          </div>
        </main>
        <aside>
          <HallOfFame HoF={hallOfFame} />
        </aside>
      </div>
    </>
  );
}

export default App;
