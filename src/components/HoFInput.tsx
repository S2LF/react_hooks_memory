import Axios from 'axios';
import React, { FormEvent, useState } from 'react';

type HoFInputType = {
  guesses: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: any;
};

function HoFInput({ guesses, onSuccess }: HoFInputType): JSX.Element {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const date = new Date().toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  });
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (name === '') {
      setError('Le nom doit avoir au moins 1 caractère');
    } else {
      try {
        const result = await Axios.post(
          `${process.env.REACT_APP_API_CALL}/api/memories`,
          {
            name,
            guesses,
            date,
          }
        );
        if (result.data.success) {
          setError('');
          setName('');
          // console.log(result.data.result);
          onSuccess(result.data.result);
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      }
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Votre nom"
      />
      <button type="submit">OK</button>
      {error !== '' && <span className="error">{error}</span>}
    </form>
  );
}

export default HoFInput;
